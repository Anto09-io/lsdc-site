"use client";

/**
 * Champ piège anti-bots : hors écran et exclu du parcours clavier, donc
 * jamais rempli par un humain. Les bots qui remplissent tout le formulaire
 * le renseignent — l'API répond alors « succès » sans créer d'abonné.
 */
export default function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
    >
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-label="Ne pas remplir ce champ"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
