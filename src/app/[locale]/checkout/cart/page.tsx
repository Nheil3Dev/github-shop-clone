import { CheckoutSummary } from "@/components/CheckoutSummary";
import { CheckoutTable } from "@/components/CheckoutTable";

export default function Page() {
  return (
    <section className="container mx-auto">
      <h1 className="text-4xl font-bold">Shopping Cart</h1>
      <div className="flex flex-row items-start gap-10">
        <CheckoutTable />
        <CheckoutSummary />
      </div>
    </section>
  );
}
