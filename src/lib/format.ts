// Helpers de formatage (dates en français, temps de lecture).

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Formate une date ISO en français lisible : "8 juin 2026". */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Libellé du temps de lecture : "5 min de lecture". */
export function readingLabel(minutes: number): string {
  return `${minutes} min de lecture`;
}
