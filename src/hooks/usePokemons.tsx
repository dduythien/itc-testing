import { useState, useEffect } from "react";
import { fetchingListPokemon, fetchingPokemonByType } from "services/pokemon";
import _uniqBy from "lodash/uniqBy";
import _flatten from "lodash/flatten";
const MAX_PAGE_SIZE = 24;

interface IUsePokemons {
  currentPage: string;
  currentType: string;
}

const usePokemons = ({ currentPage, currentType }: IUsePokemons) => {
  const [listPokemon, setListPokemon] = useState<POKEMON.IPokemonType[]>([]);
  const [pagingInfo, setPagingInfo] = useState<COMMON.PaginagtionInfo>(
    {} as COMMON.PaginagtionInfo
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPokemon = async (currentPage: number) => {
    try {
      const payload = {
        limit: MAX_PAGE_SIZE,
        offset: currentPage * MAX_PAGE_SIZE,
      };
      const response = await fetchingListPokemon(payload);
      const data: COMMON.ApiResponse<POKEMON.IPokemonType[]> =
        await response.json();
      setListPokemon(data.results || []);
      setPagingInfo({
        totalCount: data.count || 0,
        totalPages: data.count / MAX_PAGE_SIZE,
        pageSize: MAX_PAGE_SIZE,
      });
    } catch (err) {
      console.error("error", err);
    } finally {
      setLoading(false);
    }
  };

  const calculatePagingation = ({
    data,
    currentPage = 1,
    pageSize = MAX_PAGE_SIZE,
  }: COMMON.PaginagtionParams<POKEMON.IPokemonType[]>) => {
    if (!Array.isArray(data)) {
      return {
        currentPageData: [],
      };
    }
    const totalCount = data.length;

    const totalPages = Math.ceil(totalCount / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);

    const currentPageData = data.slice(startIndex, endIndex);
    return {
      totalCount,
      totalPages,
      currentPage,
      pageSize,
      currentPageData,
    };
  };

  const fetchList = async (currentType: string, currentPage: number) => {
    const selectedTypes = currentType ? currentType.split(",") : [];
    const fetchingList = selectedTypes.map(async (item) => {
      try {
        const res = await fetchingPokemonByType(item);
        const result = await res.json();
        return result;
      } catch (error) {
        return {};
      }
    });
    const pokemonDetails: POKEMON.IPokemonByTypeRes[] = await Promise.all(
      fetchingList
    );

    console.log(":pokemonDetails: ", pokemonDetails);
    const listPokemons = pokemonDetails.map((item) => item.pokemon);
    const merged = _uniqBy(_flatten(listPokemons), (item) => item.pokemon.url);
    console.log(":merged: ", merged);
    const { totalCount, totalPages, pageSize, currentPageData } =
      calculatePagingation({
        data: merged.map((item) => item.pokemon),
        currentPage,
      });
    setPagingInfo({
      totalCount: totalCount || 0,
      totalPages: totalPages || 0,
      pageSize: pageSize || MAX_PAGE_SIZE,
    });
    setListPokemon(currentPageData);
  };

  useEffect(() => {
    if (currentType) {
      fetchList(currentType, Number(currentPage || 1));
    } else {
      fetchPokemon(Number(currentPage || 0));
    }
  }, [currentType, currentPage]);

  return { listPokemon, loading, pagingInfo };
};

export default usePokemons;
