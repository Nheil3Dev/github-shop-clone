import { Link } from "@/i18n/routing";

export const Footer = () => {
  const linkStyle = "hover:underline hover:text-blue-400";
  return (
    <footer className="w-full border-t border-t-gray-300 mb-20">
      <div className="container mx-auto flex justify-between mt-6">
        <div className="w-1/6">
          <h4 className="font-extrabold text-xl">{`The NheiL's Shop`}</h4>
        </div>
        <div className="w-1/6">
          <h4 className="font-bold py-4">Shop</h4>
          <ul>
            <li>
              <Link href="#" className={linkStyle}>
                Shop all
              </Link>
            </li>
            <li>
              <Link href="#" className={linkStyle}>
                Apparel
              </Link>
            </li>
            <li>
              <Link href="/categories/bags" className={linkStyle}>
                Bags & travel
              </Link>
            </li>
            <li>
              <Link href="/categories/collectibles" className={linkStyle}>
                Collectibles
              </Link>
            </li>
            <li>
              <Link href="/categories/drinkware" className={linkStyle}>
                Drinkware
              </Link>
            </li>
            <li>
              <Link href="/categories/stickers" className={linkStyle}>
                Strickers
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-1/6">
          <h4 className="font-bold py-4">Customer service</h4>
          <ul>
            <li>
              <Link href="#" className={linkStyle}>
                Track my order
              </Link>
            </li>
            <li>
              <Link href="#" className={linkStyle}>
                Contact us
              </Link>
            </li>
            <li>
              <Link href="#" className={linkStyle}>
                Shopping info
              </Link>
            </li>
            <li>
              <Link href="#" className={linkStyle}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="#" className={linkStyle}>
                Terms & conditions
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-2/6">
          <h4 className="font-bold py-4">Let{`'`}s stay in touch</h4>
          <p>Sign up to get notified about new collections and sales.</p>
          <form action="#" className="flex flex-col gap-4 mt-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="py-1 px-2 rounded-md bg-transparent border border-gray-400 flex-grow focus:outline-offset-0 focus:outline-blue-400"
            />
            <label htmlFor="terms">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="mr-2 "
              />
              Yes, please, I{`'`}d like Github and affiliates to use my
              information for personalizated communications, targeted
              advertising and campaign effectiveness. See the{" "}
              <Link href="#" className="underline text-blue-400">
                GitHub Privacy Statement
              </Link>{" "}
              for more details.
            </label>
            <button className="self-start py-2 px-4 bg-black dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg border border-black dark:border-white hover:text-black dark:hover:text-white hover:bg-transparent">
              Sign me up
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};
