import { ButtonLink } from "@/components/Button";

/**
 * Encadré de fin d'article : CTA vers la page de vente du Système Watt/kg.
 * Remplace le bloc newsletter — le lecteur a déjà donné son email pour
 * débloquer l'article (gate), inutile de lui redemander.
 */
export default function MethodeCta() {
  return (
    <div className="rounded-3xl bg-surface px-6 py-10 text-center text-carbon ring-1 ring-violet/20 sm:px-12">
      <h2 className="font-display text-3xl italic text-carbon sm:text-4xl">
        Passe au niveau supérieur avec le{" "}
        <span className="text-violet">Système Watt/kg</span>
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-carbon/70">
        La méthode pas à pas pour maîtriser ton entraînement de A à Z à partir
        d'un capteur de puissance. Développe tes records de puissance et
        deviens durable pour rouler plus vite, plus longtemps.
      </p>
      <div className="mt-6">
        <ButtonLink href="/systeme-watt-kg" withArrow pulse>
          Découvrir le Système Watt/kg
        </ButtonLink>
      </div>
    </div>
  );
}
