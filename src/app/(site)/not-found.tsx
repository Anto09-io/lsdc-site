import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-7xl italic text-green">404</p>
      <h1 className="mt-4 font-display text-3xl italic">Page introuvable</h1>
      <p className="mx-auto mt-3 max-w-md text-cream/60">
        Cette page n'existe pas (ou plus). Reviens sur la bonne route.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Retour à l'accueil</ButtonLink>
      </div>
    </Container>
  );
}
