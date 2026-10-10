
import StorePreview from "@/components/store/StorePreview";

export const metadata = { title: "Store | Corp Prints" };

export default function StorePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-paper pb-24 pt-32 md:pt-40">
      <StorePreview />
    </main>
  );
}