"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchForm = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const { replace } = useRouter();
  const isDisabledSearch = search.length < 3;

  useEffect(() => {
    setSearch(searchParams.get("query")?.toString() ?? "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    if (pathname.split("/")[1] !== "search") {
      replace(`/search?query=${term}`);
    } else {
      replace(`/search?${params.toString()}`);
    }
  }, 300);

  // Función para manejar el evento de envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isDisabledSearch) {
      return;
    } // Evita que se recargue la página
    const form = e.target as HTMLFormElement;
    const searchTerm = form.search.value; // Obtén el valor del input "search"
    if (!searchTerm || searchTerm.trim().length === 0) return;
    handleSearch(searchTerm.trim()); // Llama a la función de búsqueda con el término ingresado
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div
        className={`absolute right-2 top-2 ${
          isDisabledSearch ? "text-gray-500" : ""
        }`}
      >
        {isDisabledSearch && (
          <label htmlFor="search">
            <MagnifyingGlassIcon width={20} />
          </label>
        )}
        {!isDisabledSearch && (
          <button disabled={isDisabledSearch}>
            <MagnifyingGlassIcon width={20} />
          </button>
        )}
      </div>
      <input
        className="w-60 py-2 pl-3 pr-10 bg-transparent border border-black dark:border-white rounded-md text-sm focus:ring"
        type="text"
        placeholder="Search entire store here..."
        id="search"
        name="search"
        value={search}
        autoComplete="off"
        onChange={(ev) => {
          setSearch(ev.target.value);
        }}
      />
    </form>
  );
};
