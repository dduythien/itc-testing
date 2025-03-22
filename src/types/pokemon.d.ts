declare namespace POKEMON {
  interface TypePokemon {
    id: number;
    name: string;
    type: string[];
    abilities: string[];
    stats: {
      hp: number;
      attack: number;
      defense: number;
      speed: number;
    };
  }
  interface IPokemonType {
    name: string;
    url: string;
  }
}
