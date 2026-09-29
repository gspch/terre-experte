import { useCallback, useEffect, useState } from "react";

const CLE = "adt-favoris";

function lire(): string[] {
  try {
    const brut = localStorage.getItem(CLE);
    return brut ? (JSON.parse(brut) as string[]) : [];
  } catch {
    return [];
  }
}

export function useFavoris() {
  const [favoris, setFavoris] = useState<string[]>([]);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    setFavoris(lire());
    setPret(true);
  }, []);

  const basculer = useCallback((id: string) => {
    setFavoris((actuels) => {
      const suivants = actuels.includes(id) ? actuels.filter((x) => x !== id) : [...actuels, id];
      try {
        localStorage.setItem(CLE, JSON.stringify(suivants));
      } catch {
        /* stockage indisponible */
      }
      return suivants;
    });
  }, []);

  return { favoris, basculer, pret, estFavori: (id: string) => favoris.includes(id) };
}
