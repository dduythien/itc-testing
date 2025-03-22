import Filter from "components/Filter";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 px-10">
      <p className="text-center">Welcome to Pokemon world</p>
      <p>Total count: 1302</p>
      <Filter data={[]} />
    </div>
  );
}
