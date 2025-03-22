import { useState, useEffect } from "react";

const LIMIT_FETCHING = 24;

interface Pokemon {
  name: string;
  url: string;
}

interface IuseFilter {
  currentType: string;
}

const useFilter = ({ currentType }: IuseFilter) => {
  const [listType, setListType] = useState<Pokemon[]>([]);
  const [listCurrentType, setListCurrentType] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const listCurrentType = String(currentType).split(",");
    setListCurrentType(listCurrentType);
  }, [currentType]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type`);
        const data: COMMON.ApiResponse<POKEMON.IPokemonType[]> =
          await response.json();
        setListType(data.results || []);
      } catch (err) {
        console.error("error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { listType, loading, listCurrentType };
};

export default useFilter;
