const fetchingPokemonType = async () => {
  return await fetch("https://pokeapi.co/api/v2/type", {
    cache: "force-cache",

    next: { revalidate: 3600 },
  });
};

const fetchingPokemonByType = async (type: string) => {
  return await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
    cache: "force-cache",

    next: { revalidate: 3600 },
  });
};

const fetchingListPokemon = async (payload: COMMON.PagingParams) => {
  const { limit, offset } = payload;
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    {
      cache: "force-cache",

      next: { revalidate: 3600 },
    }
  );
};

const fetchingPokemonInfo = async (url: string) => {
  return await fetch(url);
};

export {
  fetchingListPokemon,
  fetchingPokemonInfo,
  fetchingPokemonType,
  fetchingPokemonByType,
};
