"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "components/Filter/FilterButton";
import React from "react";
import useFilter from "hooks/useFilter";

interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "";
  const router = useRouter();
  const { listType, listCurrentType } = useFilter({ currentType });

  const createPageURL = (typeName: string) => {
    const params = new URLSearchParams(searchParams);

    let newTypes = [];
    if (listCurrentType.includes(typeName)) {
      newTypes = listCurrentType.filter((type) => type !== typeName);
    } else {
      newTypes = [...listCurrentType, typeName];
    }
    params.set("type", newTypes.join(","));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span>Types:</span>
      {listType?.map((item) => (
        <Button
          key={item.url}
          label={item.name}
          onClick={() => createPageURL(item.name)}
          isSelected={listCurrentType.includes(item.name)}
        />
      ))}
    </section>
  );
};

export default Filter;
