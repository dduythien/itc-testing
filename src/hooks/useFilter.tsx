import { useState, useEffect } from "react";
import { fetchingPokemonType } from "services/pokemon";

interface IUseFilter {
  currentType: string;
}

const useFilter = ({ currentType }: IUseFilter) => {
  const [listType, setListType] = useState<POKEMON.IPokemonType[]>([]);
  const [listCurrentType, setListCurrentType] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentType) {
      const listCurrentType = String(currentType).split(",");
      setListCurrentType(listCurrentType);
    } else {
      setListCurrentType([]);
    }
  }, [currentType]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetchingPokemonType();
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
