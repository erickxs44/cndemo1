import polo1 from "@/assets/product-polo-1.jpg";
import polo2 from "@/assets/product-polo-2.jpg";
import shirt1 from "@/assets/product-shirt-1.jpg";
import shirt2 from "@/assets/product-shirt-2.jpg";
import bermuda1 from "@/assets/product-bermuda-1.jpg";
import bermuda2 from "@/assets/product-bermuda-2.jpg";
import bermuda3 from "@/assets/product-bermuda-3.jpg";
import bermuda4 from "@/assets/product-bermuda-4.jpg";
import cap1 from "@/assets/cap-1.jpg";
import cap2 from "@/assets/cap-2.jpg";
import cap3 from "@/assets/cap-3.jpg";
import cap4 from "@/assets/cap-4.jpg";
import pants1 from "@/assets/product-pants-1.jpg";
import bRalph from "@/assets/brands/ralph-lauren.jpg";
import bHugo from "@/assets/brands/hugo-boss.jpg";
import bTommy from "@/assets/brands/tommy-hilfiger.jpg";
import bArmani from "@/assets/brands/armani.jpg";
import bCalvin from "@/assets/brands/calvin-klein.jpg";
import bLacoste from "@/assets/brands/lacoste.jpg";
import bBrooks from "@/assets/brands/brooksfield.jpg";
import bPrada from "@/assets/brands/prada.jpg";
import bAdidas from "@/assets/brands/adidas.jpg";
import bDiesel from "@/assets/brands/diesel.jpg";
import bAramis from "@/assets/brands/aramis.jpg";
import bReserva from "@/assets/brands/reserva.jpg";
export const BRAND_IMAGES: Record<string, string> = {
  "ralph-lauren": bRalph,
  "hugo-boss": bHugo,
  "tommy-hilfiger": bTommy,
  "armani": bArmani,
  "calvin-klein": bCalvin,
  "lacoste": bLacoste,
  "brooksfield": bBrooks,
  "prada": bPrada,
  "adidas": bAdidas,
  "diesel": bDiesel,
  "aramis": bAramis,
  "reserva": bReserva,
};



export type Product = {
  id: string;
  variantId: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  isNew?: boolean;
};

export const CATEGORIES = [
  { slug: "polos", name: "Polos" },
  { slug: "camisas", name: "Camisas" },
  { slug: "bermudas", name: "Bermudas" },
  { slug: "calcas", name: "Calças" },
  { slug: "bones", name: "Bonés" },
  { slug: "importados", name: "Importados" },
  { slug: "lancamentos", name: "Lançamentos" },
];

export const BRANDS: any[] = [];

const baseSizes = ["P", "M", "G", "GG"];

export const PRODUCTS: Product[] = [];

export const CHECKOUT_DOMAIN = "https://cnstore.lojavirtualnuvem.com.br";

export function buildCheckoutUrl(items: { variantId: string; quantity: number }[]) {
  if (items.length === 0) return CHECKOUT_DOMAIN;
  const first = items[0];
  const params = items.slice(1).map(i => `&variant_id[]=${i.variantId}&quantity[]=${i.quantity}`).join("");
  return `${CHECKOUT_DOMAIN}/cart/add/?variant_id=${first.variantId}&quantity=${first.quantity}${params}`;
}
