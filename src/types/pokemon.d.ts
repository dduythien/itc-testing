declare namespace POKEMON {
  interface IPokemonType {
    name: string;
    url: string;
  }
  interface IPokemonInfo extends IPokemonType {
    slot?: number;
  }

  interface IPokemonDetailInfo {
    id: number;
    name: string;
    avatar: string;
    sprites: {
      other: {
        showdown: {
          front_default: string;
        };
      };
    };
  }

  interface IPokemonByTypeItem {
    slot: number;
    pokemon: IPokemonType;
  }
  interface IPokemonByTypeRes {
    id: number;
    name: string;
    pokemon: IPokemonByTypeItem[];
  }
}
