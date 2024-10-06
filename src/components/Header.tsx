import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-black py-4 px-20">
      <Link href="/">
        <p className="text-white font-extrabold">The NheiL3 Shop</p>
      </Link>
    </header>
  );
};
