"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "@/i18n/routing";
import { register } from "@/lib/register";
import { State } from "@/types/types";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function RegisterPage() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(register, initialState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { login } = useUser();

  if (state.success) {
    const { jwt, user } = state;
    if (user) {
      const { username, email } = user;
      login({ username, email, jwt });
      router.push("/customer/account");
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="mb-40 bg-white pt-8 md:pt-0 pb-16 antialiased dark:bg-gray-900 container mx-auto text-sm">
      <h2 className="text-4xl font-bold">Create New Customer Account</h2>
      <form className="flex flex-col gap-4 mt-6 w-[600px]" action={formAction}>
        <p className="border-b border-gray-400 pb-4 mb-4 text-base font-bold">
          Personal Information
        </p>
        <label htmlFor="firstName" className="font-semibold text-gray-300">
          First name<span className="text-red-400">*</span>
        </label>
        <input
          type="firstName"
          name="firstName"
          id="firstName"
          className={`${
            state?.errors?.firstName && "border-red-400"
          } bg-transparent border rounded-md p-2 focus:ring focus:ring-blue-400`}
        />

        <div id="firstName-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.firstName && (
            <p className="-mt-2 text-xs text-red-400">
              {state?.errors?.firstName[0]}
            </p>
          )}
        </div>

        <label htmlFor="lastName" className="font-semibold text-gray-300">
          Last name<span className="text-red-400">*</span>
        </label>
        <input
          type="lastName"
          name="lastName"
          id="lastName"
          className={`${
            state?.errors?.lastName && "border-red-400"
          } bg-transparent border rounded-md p-2 focus:ring focus:ring-blue-400`}
        />

        <div id="lastName-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.lastName && (
            <p className="-mt-2 text-xs text-red-400">
              {state?.errors?.lastName[0]}
            </p>
          )}
        </div>

        <p className="border-b border-gray-400 pb-4 mb-4 mt-6 text-base font-bold">
          Sign-in Information
        </p>

        <label htmlFor="email" className="font-semibold text-gray-300">
          Email<span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={`${
            state?.errors?.email && "border-red-400"
          } bg-transparent border rounded-md p-2 focus:ring focus:ring-blue-400`}
        />

        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.email && (
            <p className="-mt-2 text-xs text-red-400">
              {state?.errors.email[0]}
            </p>
          )}
        </div>

        <label htmlFor="password" className="font-semibold text-gray-300">
          Password<span className="text-red-400">*</span>
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          id="password"
          className={`${
            state?.errors?.password && "border-red-400"
          } bg-transparent border rounded-md p-2 focus:ring focus:ring-blue-400`}
        />

        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.password && (
            <p className="-mt-2 text-xs text-red-400">
              {state?.errors.password[0]}
            </p>
          )}
        </div>

        <label htmlFor="confirm" className="font-semibold text-gray-300">
          Confirm Password<span className="text-red-400">*</span>
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          name="confirm"
          id="confirm"
          className={`${
            state?.errors?.confirm && "border-red-400"
          } bg-transparent border rounded-md p-2 focus:ring focus:ring-blue-400`}
        />

        <div id="confirm-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.confirm && (
            <p className="-mt-2 text-xs text-red-400">
              {state?.errors?.confirm[0]}
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

        <p className="text-red-400 mt-2 text-xs">* Required fields</p>

        <button
          //aria-disabled={isPending}
          className="self-start border px-4 py-2 rounded-md bg-white text-gray-900 font-bold text-base hover:bg-transparent hover:text-white mt-6"
        >
          {/*isPending ? "Creating account..." : "Create an account"*/}
          Create an account
        </button>
      </form>
    </section>
  );
}
