"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface FilterProps {
  pagingInfo: COMMON.PaginagtionInfo;
  currentPage: number;
}

const Pagingation: React.FC<FilterProps> = ({ pagingInfo, currentPage }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const currentType = searchParams.get("type") || "";
  const router = useRouter();

  const createPageURL = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-4 py-4">
      {currentPage > 1 && (
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => createPageURL(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {pagingInfo.totalPages > currentPage && (
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => createPageURL(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagingation;
