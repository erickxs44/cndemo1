import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { useReveal } from "@/hooks/use-reveal";

export function Layout({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
