"use client";

import { AccountAside } from "@/components/AccountAside";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useUser } from "@/context/UserContext";
import { Link } from "@/i18n/routing";

export default function Page() {
  const { user } = useUser();
  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "My account",
      href: "/customer/account",
      active: true,
    },
  ];
  return (
    <section className="container mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex gap-10">
        <AccountAside />
        <main className="w-full flex flex-col gap-20">
          <div>
            <h3 className="text-xl border-b pb-2">Account information</h3>
            <p className="mt-6 font-semibold">Contact information</p>
            <p className="text-xs mt-4">{user.username}</p>
            <p className="text-xs mt-1">{user.email}</p>
            <div className="flex gap-2 text-xs mt-4">
              <Link
                className="pr-2 border-r hover:text-blue-400 hover:underline"
                href={"#"}
              >
                Edit
              </Link>
              <Link className="hover:text-blue-400 hover:underline" href={"#"}>
                Change password
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl border-b pb-2">Address Book</h3>
            <div className="flex">
              <div className="w-1/2">
                <p className="mt-6 font-semibold">Default Billing Address</p>
                <p className="text-xs mt-4">
                  You have not set a default billing address.
                </p>
                <div className="flex gap-2 text-xs mt-4">
                  <Link
                    className="hover:text-blue-400 hover:underline"
                    href={"#"}
                  >
                    Edit addres
                  </Link>
                </div>
              </div>

              <div className="w-1/2">
                <p className="mt-6 font-semibold">Default Shipping Address</p>
                <p className="text-xs mt-4">
                  You have not set a default shipping address.
                </p>
                <div className="flex gap-2 text-xs mt-4">
                  <Link
                    className="hover:text-blue-400 hover:underline"
                    href={"#"}
                  >
                    Edit addres
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
