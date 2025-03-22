"use client";

import { fetcher } from "components/utils";
import React from "react";
import useSWR from "swr";
import _get from "lodash/get";

interface ButtonProps {
  data: POKEMON.IPokemonInfo;
}

const PokemonItem: React.FC<ButtonProps> = ({ data }) => {
  const {
    data: pokemon,
    error,
    isLoading,
  } = useSWR(data.url, (url) => fetcher<POKEMON.IPokemonDetailInfo>(url));
  return (
    <div className="flex flex-col items-center justify-between border p-4">
      {isLoading ? (
        <div>....loading</div>
      ) : (
        <>
          <h3>{pokemon?.name}</h3>
          <img
            alt="togetic"
            loading="lazy"
            width="35"
            height="53"
            decoding="async"
            data-nimg="1"
            className="w-20"
            src={_get(pokemon, "sprites.other.showdown.front_default")}
          />
          <p>Number: {pokemon?.id}</p>
        </>
      )}
    </div>
  );
};

export default PokemonItem;
