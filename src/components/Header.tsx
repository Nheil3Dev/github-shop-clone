import Link from "next/link";

export const Header = () => {
  return (
    <header className="dark:bg-gray-900 py-6 container md:mx-auto">
      <Link href="/">
        <p className="text-black dark:text-white font-extrabold ml-4">
          The NheiL3 Shop
        </p>
      </Link>
    </header>
  );
};
