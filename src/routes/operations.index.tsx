import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { engagements, labelsTypeEngagement, zonesOperations } from "@/data/operations";
import type { TypeEngagement, ZoneOperation } from "@/data/types";

export const Route = createFileRoute("/operations/")({
  head: () => ({
    meta: [
      { title: "Opérations et batailles depuis 1945 — Armée de terre" },
      { name: "description", content: "Chronologie documentée des principaux théâtres, opérations et batailles de l’armée de Terre française depuis 1945." },
      { property: "og:title", content: "Opérations et batailles de l’armée de Terre" },
      { property: "og:description", content: "De l’Indochine à la réassurance en Europe : contextes, objectifs, unités et conséquences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OperationsPage,
});

function OperationsPage() {
  const [type, setType] = useState<TypeEngagement | "tous">("tous");
  const [zone, setZone] = useState<ZoneOperation | "toutes">("toutes");
  const liste = useMemo(
    () => engagements.filter((e) => (type === "tous" || e.type === type) && (zone === "toutes" || e.zone === zone)),
    [type, zone],
  );

  return (
    <div>
      <header className="field-grid border-b border-border bg-sand/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="rule-label">Histoire opérationnelle · 1945—aujourd’hui</p>
          <h1 className="mt-3 max-w-4xl text-4xl sm:text-5xl">Théâtres, opérations et batailles</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Une chronologie pour comprendre où, pourquoi et comment l’armée de Terre a été engagée,
            des guerres de décolonisation à la défense collective en Europe.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="rule-label mb-3">Nature de l’engagement</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={type === "tous" ? "default" : "outline"} onClick={() => setType("tous")}>Tous</Button>
              {(Object.entries(labelsTypeEngagement) as [TypeEngagement, string][]).map(([id, label]) => (
                <Button key={id} size="sm" variant={type === id ? "default" : "outline"} onClick={() => setType(id)}>{label}</Button>
              ))}
            </div>
          </div>
          <label className="text-sm text-muted-foreground">
            <span className="rule-label mb-2 block">Zone</span>
            <select value={zone} onChange={(event) => setZone(event.target.value as ZoneOperation | "toutes")} className="h-9 min-w-48 rounded-sm border border-border bg-card px-3 text-foreground outline-none focus:border-primary">
              <option value="toutes">Toutes les zones</option>
              {zonesOperations.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <p className="rule-label mt-6">{liste.length} engagements documentés</p>
        <ol className="relative mt-5 border-l border-primary/40 pl-6 sm:pl-10">
          {liste.map((engagement) => (
            <li key={engagement.id} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary sm:-left-[47px]" />
              <Link to="/operations/$operation" params={{ operation: engagement.id }} className="group block border-b border-border pb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-lg font-medium text-primary">{engagement.anneeDebut}</span>
                  <span className="rule-label border-l border-border pl-3">{labelsTypeEngagement[engagement.type]}</span>
                </div>
                <h2 className="mt-2 text-2xl text-foreground transition-colors group-hover:text-primary">{engagement.nom}</h2>
                <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{engagement.resume}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{engagement.debut} — {engagement.fin}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{engagement.lieu}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}