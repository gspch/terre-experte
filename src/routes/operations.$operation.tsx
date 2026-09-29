import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CalendarDays, ExternalLink, MapPin } from "lucide-react";

import { equipements } from "@/data/equipements";
import { engagementParId, labelsTypeEngagement } from "@/data/operations";
import { regiments } from "@/data/regiments";

export const Route = createFileRoute("/operations/$operation")({
  loader: ({ params }) => {
    const engagement = engagementParId(params.operation);
    if (!engagement) throw notFound();
    return { engagement };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Engagement introuvable" }, { name: "robots", content: "noindex" }] };
    const { engagement } = loaderData;
    const description = engagement.resume.slice(0, 180);
    return { meta: [
      { title: `${engagement.nom} — Histoire opérationnelle` },
      { name: "description", content: description },
      { property: "og:title", content: engagement.nom },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: OperationPage,
  notFoundComponent: OperationIntrouvable,
});

function OperationIntrouvable() {
  return <div className="mx-auto max-w-2xl px-4 py-24 text-center"><h1 className="text-3xl">Engagement introuvable</h1><Link to="/operations" className="mt-6 inline-block text-primary hover:underline">Revenir à la chronologie</Link></div>;
}

function OperationPage() {
  const { engagement } = Route.useLoaderData();
  const unites = engagement.regimentIds.map((id) => regiments.find((r) => r.id === id)).filter((r) => r !== undefined);
  const materiels = engagement.equipementIds.map((id) => equipements.find((e) => e.id === id)).filter((e) => e !== undefined);

  return (
    <div>
      <header className="field-grid border-b border-border bg-sand/50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Link to="/operations" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Chronologie</Link>
          <p className="rule-label mt-7 text-primary">{labelsTypeEngagement[engagement.type]} · {engagement.zone}</p>
          <h1 className="mt-2 max-w-4xl text-4xl sm:text-5xl">{engagement.nom}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{engagement.resume}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{engagement.debut} — {engagement.fin}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{engagement.lieu}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {[['Contexte', engagement.contexte], ['Objectifs', engagement.objectifs], ['Déroulement', engagement.deroulement], ['Résultat', engagement.resultat], ['Conséquences', engagement.consequences]].map(([titre, texte]) => (
            <section key={titre}><h2 className="stencil text-sm text-muted-foreground">{titre}</h2><p className="mt-3 text-foreground">{texte}</p></section>
          ))}
          <section>
            <h2 className="stencil text-sm text-muted-foreground">Sources</h2>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {engagement.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 py-3 text-sm text-primary hover:underline"><span>{source.titre} — {source.organisme}</span><ExternalLink className="h-4 w-4 shrink-0" /></a></li>)}
            </ul>
          </section>
        </div>
        <aside className="space-y-8">
          <section><h2 className="stencil text-sm text-muted-foreground">Unités reliées</h2><div className="mt-3 divide-y divide-border border-y border-border">{unites.map((r) => <Link key={r.id} to="/organisation/$regiment" params={{ regiment: r.id }} className="flex items-center justify-between py-3 text-sm hover:text-primary"><span>{r.sigle}</span><span className="text-xs text-muted-foreground">{r.garnison}</span></Link>)}</div></section>
          {materiels.length > 0 && <section><h2 className="stencil text-sm text-muted-foreground">Matériels associés</h2><div className="mt-3 divide-y divide-border border-y border-border">{materiels.map((e) => <Link key={e.id} to="/equipements/$equipement" params={{ equipement: e.id }} className="flex items-center gap-2 py-3 text-sm hover:text-primary"><BookOpen className="h-4 w-4" />{e.nom}</Link>)}</div></section>}
        </aside>
      </main>
    </div>
  );
}