// Injecte un bloc JSON-LD (données structurées Schema.org) dans le <head>.
// Utilisé pour le type BlogPosting sur chaque article.

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu est généré côté serveur à partir de données maîtrisées.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
