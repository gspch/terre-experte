import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin } from "lucide-react";
import { useMemo, useState } from "react";

import { armes, brigades, divisions } from "@/data/organisation";
import { regiments } from "@/data/regiments";
import { mediasRegiments } from "@/data/medias-regiments";
import type { ArmeId } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organisation/")({
  head: () => ({
    meta: [
      { title: "Organisation de l'armée de terre — divisions, brigades, régiments" },
      {
        name: "description",
        content:
          "L'arborescence complète de l'armée de terre française : deux divisions, onze brigades et commandements, et la liste filtrable des régiments.",
      },
      { property: "og:title", content: "Organisation de l'armée de terre" },
      {
        property: "og:description",
        content: "Divisions, brigades, armes et régiments de l'armée de terre française.",
      },
    ],
  }),
  component: OrganisationPage,
});

function OrganisationPage() {
  const [arme, setArme] = useState<ArmeId | "toutes">("toutes");
  const [brigade, setBrigade] = useState<string>("toutes");
  const [q, setQ] = useState("");

  const liste = useMemo(() => {
    const t = q.trim().toLowerCase();
    return regiments
      .filter((r) => (arme === "toutes" ? true : r.arme === arme))
      .filter((r) => (brigade === "toutes" ? true : r.brigade === brigade))
      .filter((r) =>
        t
          ? `${r.sigle} ${r.nom} ${r.garnison} ${r.departement}`.toLowerCase().includes(t)
          : true,
      )
      .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  }, [arme, brigade, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="rule-label">Organisation</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">La charpente de l'armée de terre</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        Le chef d'état-major de l'armée de terre commande deux divisions de combat et un ensemble de
        commandements spécialisés. Chaque division regroupe des brigades, qui rassemblent elles-mêmes
        les régiments — l'unité de base de la vie militaire, forte de 800 à 1 300 militaires.
      </p>

      <section className="mt-12">
        <h2 className="stencil text-sm text-muted-foreground">Arborescence</h2>
        <div className="mt-4 space-y-4">
          {divisions.map((d) => (
            <details key={d.id} className="group rounded-sm border border-border bg-card" open>
              <summary className="flex cursor-pointer list-none items-center gap-3 p-5">
                <ChevronRight className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-90" />
                <span className="min-w-0">
                  <span className="block text-lg text-foreground">{d.nom}</span>
                  <span className="block text-xs text-muted-foreground">
                    État-major : {d.etatMajor}
                  </span>
                </span>
              </summary>
              <div className="border-t border-border px-5 py-4">
                <p className="text-sm text-muted-foreground">{d.role}</p>
                <div className="mt-4 grid gap-px bg-border sm:grid-cols-2">
                  {d.brigades.map((bid) => {
                    const b = brigades.find((x) => x.id === bid)!;
                    const n = regiments.filter((r) => r.brigade === bid).length;
                    return (
                      <button
                        key={bid}
                        type="button"
                        onClick={() => {
                          setBrigade(bid);
                          setArme("toutes");
                          document.getElementById("liste-regiments")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-card p-4 text-left transition-colors hover:bg-secondary"
                      >
                        <span className="block text-sm font-medium text-foreground">{b.nom}</span>
                        <span className="block text-xs text-muted-foreground">{b.specialite}</span>
                        <span className="rule-label mt-2 block">
                          {b.etatMajor} · {n} unité{n > 1 ? "s" : ""} référencée{n > 1 ? "s" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="stencil text-sm text-muted-foreground">Les armes et subdivisions d'arme</h2>
        <div className="mt-4 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {armes.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => {
                setArme(a.id);
                setBrigade("toutes");
                document.getElementById("liste-regiments")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-card p-5 text-left transition-colors hover:bg-secondary"
            >
              <span className="block text-base font-medium text-foreground">{a.nom}</span>
              {a.devise && <span className="mt-1 block text-xs italic text-accent">{a.devise}</span>}
              <span className="mt-2 block text-sm text-muted-foreground">{a.role}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="liste-regiments" className="mt-14 scroll-mt-20">
        <h2 className="stencil text-sm text-muted-foreground">Régiments et formations</h2>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nom, sigle ou ville de garnison"
            className="h-10 w-full rounded-sm border border-border bg-card px-3 text-sm outline-none focus:border-primary sm:max-w-xs"
          />
          <select
            value={arme}
            onChange={(e) => setArme(e.target.value as ArmeId | "toutes")}
            className="h-10 rounded-sm border border-border bg-card px-3 text-sm outline-none focus:border-primary"
          >
            <option value="toutes">Toutes les armes</option>
            {armes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nom}
              </option>
            ))}
          </select>
          <select
            value={brigade}
            onChange={(e) => setBrigade(e.target.value)}
            className="h-10 rounded-sm border border-border bg-card px-3 text-sm outline-none focus:border-primary"
          >
            <option value="toutes">Toutes les brigades</option>
            {brigades.map((b) => (
              <option key={b.id} value={b.id}>
                {b.sigle}
              </option>
            ))}
          </select>
          {(arme !== "toutes" || brigade !== "toutes" || q) && (
            <button
              type="button"
              onClick={() => {
                setArme("toutes");
                setBrigade("toutes");
                setQ("");
              }}
              className="h-10 rounded-sm border border-border px-3 text-sm text-muted-foreground hover:text-foreground"
            >
              Réinitialiser
            </button>
          )}
        </div>

        <p className="rule-label mt-4">{liste.length} unité(s)</p>

        <div className="mt-3 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((r) => {
            const a = armes.find((x) => x.id === r.arme)!;
            const media = mediasRegiments[r.id];
            return (
              <Link
                key={r.id}
                to="/organisation/$regiment"
                params={{ regiment: r.id }}
                className="group flex bg-card p-5 transition-colors hover:bg-secondary"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-primary" /><span className="stencil text-sm text-foreground">{r.sigle}</span></span>
                  <span className="mt-2 block text-sm text-foreground">{r.nom}</span>
                  <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{r.garnison} ({r.departement})</span>
                  <span className="rule-label mt-3 block">{a.nom}</span>
                </span>
                {media && <img src={media.src} alt="" loading="lazy" className="ml-3 h-20 w-20 shrink-0 object-contain" />}
              </Link>
            );
          })}
        </div>

        {liste.length === 0 && (
          <p className={cn("mt-6 text-sm text-muted-foreground")}>Aucune unité ne correspond.</p>
        )}
      </section>
    </div>
  );
}
