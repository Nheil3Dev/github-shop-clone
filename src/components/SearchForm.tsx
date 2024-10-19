"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname.split("/")[0]}/search?${params.toString()}`);
  }, 300);

  // Función para manejar el evento de envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Evita que se recargue la página
    const form = e.target as HTMLFormElement;
    const searchTerm = form.search.value; // Obtén el valor del input "search"
    if (!searchTerm || searchTerm.trim().length === 0) return;
    handleSearch(searchTerm.trim()); // Llama a la función de búsqueda con el término ingresado
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <label className="absolute right-2 top-2" htmlFor="search">
        <MagnifyingGlassIcon width={20} />
      </label>
      <input
        className="py-2 pl-3 pr-10 bg-transparent border border-black dark:border-white rounded-md text-sm focus:ring"
        type="text"
        placeholder="Search entire store here..."
        id="search"
        name="search"
        defaultValue={searchParams.get("query")?.toString()}
        autoComplete="off"
      />
    </form>
  );
};
