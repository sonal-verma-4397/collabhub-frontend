import { Search } from "lucide-react";

// -------------------- SEARCH ---------------------
export default function SearchWorkspace() {
  return (
    <section className="w-[70%] mx-auto py-6">
      <div className="flex items-center gap-2 w-fit mx-auto border-b border-gray-600">
        <Search size={24} />
        <input
          className="outline-none text-lg bg-transparent placeholder-gray-400"
          type="text"
          placeholder="Search your workspaces"
        />
      </div>
    </section>
  );
}
