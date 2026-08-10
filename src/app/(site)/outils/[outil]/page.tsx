import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import ToolGate from "@/components/tools/ToolGate";
import GpxCalculator from "@/components/tools/GpxCalculator";
import CalculateurGpxLanding from "@/components/tools/CalculateurGpxLanding";
import GlucidesLanding from "@/components/tools/GlucidesLanding";
import { TOOLS, getTool } from "@/lib/tools";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ outil: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ outil: string }>;
}): Promise<Metadata> {
  const { outil } = await params;
  const tool = getTool(outil);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `/outils/${tool.slug}` },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ outil: string }>;
}) {
  const { outil } = await params;
  const tool = getTool(outil);
  if (!tool) notFound();

  // Le calculateur GPX a sa propre landing page complète (portée de
  // legacy/acces-calculateur). Les futurs outils sans landing dédiée
  // retombent sur le gate générique.
  if (tool.slug === "calculateur-gpx") {
    return <CalculateurGpxLanding />;
  }

  // Calculateur de glucides : landing de capture (gate email Beehiiv) qui
  // débloque l'outil sur place après inscription.
  if (tool.slug === "calculateur-glucides") {
    return <GlucidesLanding />;
  }

  return (
    <Container className="py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-5xl italic">{tool.title}</h1>
        <p className="mt-4 text-lg text-cream/60">{tool.description}</p>
      </header>

      <div className="mt-12">
        <ToolGate toolSlug={tool.slug}>{null}</ToolGate>
      </div>
    </Container>
  );
}
