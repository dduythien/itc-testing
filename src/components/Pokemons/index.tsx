"use client";

import React from "react";
import PokemonItem from "./PokemonItem";

interface ButtonProps {
  data: POKEMON.IPokemonInfo[];
}

const Pokemons: React.FC<ButtonProps> = ({ data = [] }) => {
  return (
    <section className="grid grid-cols-6 gap-x-16 gap-y-6">
      {data.map((pokmemon) => (
        <PokemonItem key={pokmemon.url} data={pokmemon} />
      ))}
    </section>
  );
};

export default Pokemons;
