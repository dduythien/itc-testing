"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "components/utils";
import Image from "next/image";

import _get from "lodash/get";

interface ButtonProps {
  data: POKEMON.IPokemonInfo;
}

const PokemonItem: React.FC<ButtonProps> = ({ data }) => {
  const { data: pokemon, isLoading } = useSWR(data.url, (url) =>
    fetcher<POKEMON.IPokemonDetailInfo>(url)
  );

  return (
    <div className="flex flex-col items-center justify-between border p-4">
      {isLoading ? (
        <div>....loading</div>
      ) : (
        <>
          <h3>{pokemon?.name}</h3>
          <Image
            alt="togetic"
            width={35}
            height={53}
            className="w-20"
            src={
              (_get(pokemon, "sprites.other.showdown.front_default") ||
                _get(pokemon, "sprites.front_default")) as string
            }
            priority={false} // Set to true if this is above the fold
          />
          <p>Number: {pokemon?.id}</p>
        </>
      )}
    </div>
  );
};

export default PokemonItem;
