"use client";

import { useWelcome } from "@/hooks/useWelcome";
import { Link } from "@/i18n/routing";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const Welcome = () => {
  const { user, btnRef, menuRef, isOpen, logout, toggleOpen } = useWelcome();

  return (
    <div className="text-xs text-gray-900 font-semibold">
      {!user.username && (
        <>
          <span>Welcome to The NheiL{"'"}s Shop</span>
          <Link
            className="border border-gray-900 px-1 rounded-sm mx-2 hover:underline"
            href="/customer/account/login/"
          >
            Sign in
          </Link>
          <span>or</span>
          <Link
            className="border border-gray-900 px-1 rounded-sm ml-2 hover:underline"
            href="/customer/account/create"
          >
            Create an account
          </Link>
        </>
      )}
      {user.username && (
        <div className="relative flex items-center">
          <span>Welcome, {user.username}!</span>
          <button
            ref={btnRef}
            className={`${
              isOpen ? "rotate-180" : ""
            } ml-1 transition-transform duration-300 ease-in-out`}
            onClick={toggleOpen}
          >
            <ChevronDownIcon width={14} />
          </button>
          {isOpen && (
            <div
              ref={menuRef}
              className="z-10 absolute w-32 -bottom-[84px] -right-2 flex flex-col bg-gray-900 border text-gray-200"
            >
              <Link
                onClick={toggleOpen}
                className="text-left p-3 hover:bg-gray-200 hover:text-gray-900"
                href={"/customer/account"}
              >
                My account
              </Link>
              <button
                className="text-left p-3 hover:bg-gray-200 hover:text-gray-900"
                onClick={() => {
                  logout();
                  toggleOpen();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
