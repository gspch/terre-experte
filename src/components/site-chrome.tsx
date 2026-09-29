import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { RechercheGlobale } from "@/components/recherche-globale";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const liens = [
  { to: "/organisation", label: "Organisation" },
  { to: "/grades", label: "Grades" },
  { to: "/equipements", label: "Équipements" },
  { to: "/operations", label: "Opérations" },
  { to: "/ecoles", label: "Écoles" },
  { to: "/glossaire", label: "Glossaire" },
] as const;

export function SiteHeader() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <span className="stencil text-xs">AT</span>
          </span>
          <span className="leading-tight">
            <span className="stencil block text-sm text-foreground">Armée de Terre</span>
            <span className="rule-label block">Manuel interactif</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {liens.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-secondary text-foreground" }}
              className="rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <div className="hidden md:block">
            <RechercheGlobale />
          </div>
          <div className="md:hidden">
            <RechercheGlobale variant="icone" />
          </div>

          <Sheet open={ouvert} onOpenChange={setOuvert}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Ouvrir le menu"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="stencil text-sm">Navigation</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                <Link
                  to="/"
                  onClick={() => setOuvert(false)}
                  className="rounded-sm px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Accueil
                </Link>
                {liens.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOuvert(false)}
                    activeProps={{ className: "bg-secondary text-foreground" }}
                    className="rounded-sm px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-sand/60">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="stencil text-sm text-foreground">Manuel interactif de l'armée de terre</p>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Ressource pédagogique indépendante, rédigée à partir d'informations publiques. Elle n'émane
          pas du ministère des Armées et n'a aucune valeur officielle. Les images sont créditées sur
          chaque fiche et restent soumises à la licence indiquée.
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/organisation" className="hover:text-foreground">Organisation</Link>
          <Link to="/grades" className="hover:text-foreground">Grades</Link>
          <Link to="/equipements" className="hover:text-foreground">Équipements</Link>
          <Link to="/operations" className="hover:text-foreground">Opérations</Link>
          <Link to="/ecoles" className="hover:text-foreground">Écoles</Link>
          <Link to="/glossaire" className="hover:text-foreground">Glossaire</Link>
        </nav>
      </div>
    </footer>
  );
}
