import { useState, useEffect } from "react";
import { fetchingListPokemon, fetchingPokemonInfo } from "services/pokemon";
import _get from "lodash/get";

interface IUsePokemonInfo {
  url: string;
}

const usePokemonInfo = ({ url }: IUsePokemonInfo) => {
  const [pokemonInfo, setPokemonInfo] = useState<POKEMON.IPokemonDetailInfo>(
    {} as POKEMON.IPokemonDetailInfo
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const payload = {
          limit: 24,
          offset: 0,
        };
        const response = await fetchingPokemonInfo(url);
        const data: POKEMON.IPokemonDetailInfo = await response.json();
        const avatar = _get(data, "sprites.other.showdown.front_default", "");
        setPokemonInfo({ ...data, avatar });
      } catch (err) {
        console.error("error", err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchPokemonDetail();
    }
  }, [url]);

  return { pokemonInfo, loading };
};

export default usePokemonInfo;
