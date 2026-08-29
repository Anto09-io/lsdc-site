import { NextResponse } from "next/server";
import Stripe from "stripe";

// Webhook Stripe : à chaque achat de la Méthode Watt/kg, ajoute l'acheteur
// dans Lumail avec le tag `client-methode-wattkg`. Ce tag déclenche le workflow
// « Livraison — Méthode Watt/kg » qui envoie l'email avec le lien du PDF.
//
// Stripe envoie un événement pour CHAQUE paiement du compte : on ne livre que
// si la commande contient bien le produit de l'ebook.

// Le body brut est nécessaire à la vérification de signature : pas de edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Produit Stripe « La méthode watt/kg ebook » (29 €).
const EBOOK_PRODUCT_ID = "prod_VA2UYnMjR66PQr";

// Tag Lumail qui déclenche le workflow de livraison.
const LUMAIL_TAG = "client-methode-wattkg";
const LUMAIL_ENDPOINT = "https://lumail.io/api/v2/tools/add_subscriber";

export async function POST(request: Request) {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  const LUMAIL_API_KEY = process.env.LUMAIL_API_KEY;

  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !LUMAIL_API_KEY) {
    console.error(
      "Webhook Stripe : STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET ou LUMAIL_API_KEY manquant.",
    );
    return NextResponse.json(
      { error: "Configuration du serveur incomplète." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature absente." }, { status: 400 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      STRIPE_WEBHOOK_SECRET,
    );
  } catch (e) {
    // Signature invalide : requête non authentifiée, on refuse sans rejouer.
    console.error(
      "Webhook Stripe : signature invalide.",
      e instanceof Error ? e.message : e,
    );
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Un paiement non abouti ne doit rien livrer.
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    // Les line items ne sont pas inclus dans l'événement : il faut les demander.
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ["data.price.product"],
    });

    const containsEbook = lineItems.data.some((item) => {
      const product = item.price?.product;
      const productId =
        typeof product === "string" ? product : product?.id ?? null;
      return productId === EBOOK_PRODUCT_ID;
    });

    if (!containsEbook) {
      // Un autre produit : rien à livrer, mais l'événement est bien traité.
      return NextResponse.json({ received: true, delivered: false }, { status: 200 });
    }

    const email = (
      session.customer_details?.email ||
      session.customer_email ||
      ""
    )
      .trim()
      .toLowerCase();

    if (!email) {
      console.error(
        "Webhook Stripe : achat ebook sans email exploitable.",
        session.id,
      );
      return NextResponse.json({ received: true, delivered: false }, { status: 200 });
    }

    const name = session.customer_details?.name || undefined;

    const lumailRes = await fetch(LUMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LUMAIL_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        ...(name ? { name } : {}),
        tags: [LUMAIL_TAG],
        // Un acheteur qui s'était désabonné doit quand même recevoir son produit.
        resubscribe: true,
        // C'est l'ajout du tag qui déclenche le workflow de livraison.
        triggerWorkflows: true,
      }),
    });

    if (!lumailRes.ok) {
      const detail = await lumailRes.text().catch(() => "");
      console.error(
        "Webhook Stripe : échec de l'ajout Lumail.",
        lumailRes.status,
        detail.slice(0, 500),
      );
      // 500 → Stripe rejouera l'événement, l'acheteur finira par être livré.
      return NextResponse.json(
        { error: "Ajout Lumail impossible." },
        { status: 500 },
      );
    }

    console.log("Webhook Stripe : ebook livré à", email, "session", session.id);
    return NextResponse.json({ received: true, delivered: true }, { status: 200 });
  } catch (e) {
    console.error(
      "Webhook Stripe : erreur de traitement.",
      e instanceof Error ? e.message : e,
    );
    return NextResponse.json({ error: "Erreur de traitement." }, { status: 500 });
  }
}
