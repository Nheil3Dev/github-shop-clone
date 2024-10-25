"use client";

import { useUser } from "@/context/UserContext";
import { Link, useRouter } from "@/i18n/routing";
import { login } from "@/lib/login";
import { State } from "@/types/types";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(login, initialState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { login: localLogin, user } = useUser();

  if (state.success) {
    const { jwt, user } = state;
    if (user) {
      const { username, email } = user;
      localLogin({ username, email, jwt });
      router.push("/");
    }
  }
  useEffect(() => {
    if (user.username && user.jwt) {
      router.push("/");
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (user.jwt && user.username) return;

  return (
    <section className="mb-40 bg-white pt-8 md:pt-0 pb-16 antialiased dark:bg-gray-900 container mx-auto text-sm">
      <h2 className="text-4xl font-bold">Customer login</h2>
      <div className="flex gap-20 mt-6">
        <div className="w-1/2">
          <p className="border-b border-gray-400 pb-4 mb-4 text-base">
            Registered customers
          </p>
          <p>If you have an account, sign in with your email address.</p>
          <p className="text-red-400 mt-2 text-xs">* Required fields</p>
          <form className="flex flex-col gap-4 mt-4" action={formAction}>
            <label htmlFor="email" className="font-semibold">
              Email<span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`${
                state?.errors?.email && "border-red-400 focus:ring-red-400"
              } bg-transparent border rounded-md p-2 focus:ring focus:ring-blue-400 w-96`}
            />

            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.email && (
                <p className="-mt-2 text-xs text-red-400">
                  {state?.errors?.email[0]}
                </p>
              )}
            </div>

            <label htmlFor="password" className="font-semibold">
              Password<span className="text-red-400">*</span>
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              className={`${
                state?.errors?.password && "border-red-400 focus:ring-red-400"
              } bg-transparent border rounded-md p-2 focus:ring focus:ring-blue-400 w-96`}
            />

            <div id="firstName-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.password && (
                <p className="-mt-2 text-xs text-red-400">
                  {state?.errors?.password[0]}
                </p>
              )}
            </div>

            <label htmlFor="passwordVisibility">
              <input
                type="checkbox"
                name=""
                id="passwordVisibility"
                className="mr-2"
                onChange={togglePasswordVisibility}
              />
              Show password
            </label>
            <div className="flex items-center gap-4 mt-4">
              <button className="border px-4 py-2 rounded-md bg-white text-gray-900 font-bold hover:bg-transparent hover:text-white">
                Sign in
              </button>
              <Link href="#" className="hover:text-blue-400 text-xs">
                Forgot your password?
              </Link>
            </div>
            {state?.message && <p className="text-red-400">{state.message}</p>}
          </form>
          <p className="mt-8 text-xs">
            Have SSO credentials?{" "}
            <Link href="#" className="underline hover:text-blue-400">
              Sign in here
            </Link>
          </p>
        </div>
        <div className="w-1/2">
          <p className="border-b border-gray-400 pb-4 mb-4 text-base">
            New Customers
          </p>
          <p className="mb-10">
            Creating an account offers numerous benefits, including faster
            checkout, multiple address storage, order tracking, and more.
          </p>
          <Link
            href="/customer/account/create"
            className="border px-4 py-2 rounded-md bg-white text-gray-900 font-bold hover:bg-transparent hover:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
}
