// Petit helper pour concaténer des classes conditionnelles
// (sans dépendance externe type clsx).
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
