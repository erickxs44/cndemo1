import polo1 from "@/assets/product-polo-1.jpg";
import polo2 from "@/assets/product-polo-2.jpg";
import shirt1 from "@/assets/product-shirt-1.jpg";
import shirt2 from "@/assets/product-shirt-2.jpg";
import bermuda1 from "@/assets/product-bermuda-1.jpg";
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
  { slug: "lancamentos", name: "Lançamentos" },
];

export const BRANDS = [
  { slug: "ralph-lauren", name: "Ralph Lauren", tagline: "Timeless American Style", description: "Sofisticação atemporal com a herança do polo. Peças icônicas que atravessam gerações." },
  { slug: "hugo-boss", name: "Hugo Boss", tagline: "Be Your Own Boss", description: "Alfaiataria alemã contemporânea. Precisão de corte para o homem urbano e moderno." },
  { slug: "tommy-hilfiger", name: "Tommy Hilfiger", tagline: "Classic American Cool", description: "O preppy americano reinventado. Cores vibrantes, tecidos nobres, atitude global." },
  { slug: "armani", name: "Emporio Armani", tagline: "Italian Excellence", description: "Sofisticação italiana em cada detalhe. Alfaiataria contemporânea para o homem moderno." },
  { slug: "calvin-klein", name: "Calvin Klein", tagline: "Minimalism Refined", description: "Estética minimalista, design limpo e silhuetas modernas. A essência do luxo silencioso." },
  { slug: "lacoste", name: "Lacoste", tagline: "Become What You Are", description: "A elegância atemporal do crocodilo verde. Polos premium em piquet exclusivo." },
  { slug: "brooksfield", name: "Brooksfield", tagline: "Refined Menswear", description: "Tradição em alfaiataria brasileira. Peças sob medida para o cavalheiro contemporâneo." },
  { slug: "prada", name: "Prada", tagline: "Made in Milano", description: "A vanguarda italiana do luxo. Design intelectual, materiais excepcionais, presença absoluta." },
  { slug: "adidas", name: "Adidas Originals", tagline: "Impossible is Nothing", description: "Streetwear de herança esportiva. Onde performance encontra cultura urbana premium." },
];

const baseSizes = ["P", "M", "G", "GG"];

export const PRODUCTS: Product[] = [
  { id: "1", variantId: "10001", name: "Polo Piquet Premium", brand: "Lacoste", category: "polos", price: 459, oldPrice: 599, image: polo1, colors: [{name:"Preto",hex:"#000"},{name:"Verde",hex:"#0a4d2e"},{name:"Branco",hex:"#fff"}], sizes: baseSizes, description: "Polo em piquet de algodão peruano, corte slim fit clássico. Acabamento premium com bordado discreto.", isNew: true },
  { id: "2", variantId: "10002", name: "Camisa Linho Italiana", brand: "Emporio Armani", category: "camisas", price: 789, image: shirt1, colors: [{name:"Off-White",hex:"#f5f0e8"},{name:"Areia",hex:"#d4c4a8"}], sizes: baseSizes, description: "Linho italiano 100% natural. Caimento impecável para ocasiões refinadas." },
  { id: "3", variantId: "10003", name: "Bermuda Chino Sarja", brand: "Tommy Hilfiger", category: "bermudas", price: 329, image: bermuda1, colors: [{name:"Caqui",hex:"#c8a878"},{name:"Marinho",hex:"#1a2540"}], sizes: ["38","40","42","44","46"], description: "Sarja de algodão pesado com elastano. Conforto e elegância para o dia a dia." },
  { id: "4", variantId: "10004", name: "Calça Alfaiataria Slim", brand: "Hugo Boss", category: "calcas", price: 899, image: pants1, colors: [{name:"Preto",hex:"#000"},{name:"Marinho",hex:"#0a1530"}], sizes: ["38","40","42","44","46","48"], description: "Lã italiana fria com toque sedoso. Corte slim moderno com bainha viva.", isNew: true },
  { id: "5", variantId: "10005", name: "Polo Manga Curta Pima", brand: "Ralph Lauren", category: "polos", price: 389, image: polo2, colors: [{name:"Marinho",hex:"#0a1530"},{name:"Bordô",hex:"#5a0e1e"}], sizes: baseSizes, description: "Algodão Pima de fibra longa. Toque macio e durabilidade superior." },
  { id: "6", variantId: "10006", name: "Camisa Oxford Tailored", brand: "Calvin Klein", category: "camisas", price: 549, oldPrice: 699, image: shirt2, colors: [{name:"Grafite",hex:"#2a2a2e"},{name:"Preto",hex:"#000"}], sizes: baseSizes, description: "Tecido oxford encorpado, corte tailored. Versatilidade entre o casual e o social.", isNew: true },
];

export const CHECKOUT_DOMAIN = "https://cnstore.lojavirtualnuvem.com.br";

export function buildCheckoutUrl(items: { variantId: string; quantity: number }[]) {
  if (items.length === 0) return CHECKOUT_DOMAIN;
  const first = items[0];
  const params = items.slice(1).map(i => `&variant_id[]=${i.variantId}&quantity[]=${i.quantity}`).join("");
  return `${CHECKOUT_DOMAIN}/cart/add/?variant_id=${first.variantId}&quantity=${first.quantity}${params}`;
}
