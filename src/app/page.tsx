"use client";
import Filter from "components/Filter";
import Pagingation from "components/Pagingation";
import Pokemons from "components/Pokemons";
import useFilter from "hooks/useFilter";

import usePokemons from "hooks/usePokemons";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "";
  const currentPage = searchParams.get("page") || "";

  const { listType, listCurrentType } = useFilter({ currentType });
  const { listPokemon, pagingInfo } = usePokemons({ currentType, currentPage });

  return (
    <div className="flex flex-col gap-4 px-10">
      <p className="text-center">Welcome to Pokemon world</p>
      <p>Total count: {pagingInfo.totalCount}</p>
      <Filter data={listType} listCurrentType={listCurrentType} />
      <Pokemons data={listPokemon} />
      <Pagingation
        pagingInfo={pagingInfo}
        currentPage={Number(currentPage || 1)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
