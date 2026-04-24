export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email manquant' });
  }

  const BEEHIIV_API_KEY      = process.env.BEEHIIV_API_KEY;
  const BEEHIIV_PUB_ID       = process.env.BEEHIIV_PUB_ID;
  const BEEHIIV_AUTOMATION_ID = process.env.BEEHIIV_AUTOMATION_ID;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${BEEHIIV_API_KEY}`
  };

  try {
    // Étape 1 — Créer l'abonné
    const subRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: false,
          utm_source: 'calculateur-gpx',
          utm_medium: 'landing-page'
        })
      }
    );

    const subData = await subRes.json().catch(() => ({}));

    if (!subRes.ok && subRes.status !== 201) {
      console.error('Beehiiv subscribe error:', subRes.status, JSON.stringify(subData));
      return res.status(500).json({ error: 'Erreur création abonné', detail: subData });
    }

    // Étape 2 — Déclencher l'automation
    const automationRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/automations/${BEEHIIV_AUTOMATION_ID}/journeys`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ email })
      }
    );

    const automationData = await automationRes.json().catch(() => ({}));

    if (!automationRes.ok) {
      console.error('Beehiiv automation error:', automationRes.status, JSON.stringify(automationData));
    }

    return res.status(200).json({ success: true });

  } catch (e) {
    console.error('Fetch error:', e.message);
    return res.status(500).json({ error: 'Erreur réseau', detail: e.message });
  }
}
