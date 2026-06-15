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
  { slug: "diesel", name: "Diesel", tagline: "For Successful Living", description: "Atitude italiana e denim icônico. Para quem vive sem pedir permissão." },

];

const baseSizes = ["P", "M", "G", "GG"];

export const PRODUCTS: Product[] = [
  { id: "1", variantId: "10001", name: "Polo Piquet Premium", brand: "Lacoste", category: "polos", price: 459, oldPrice: 599, image: polo1, colors: [{name:"Preto",hex:"#000"},{name:"Verde",hex:"#0a4d2e"},{name:"Branco",hex:"#fff"}], sizes: baseSizes, description: "Polo em piquet de algodão peruano, corte slim fit clássico. Acabamento premium com bordado discreto.", isNew: true },
  { id: "2", variantId: "10002", name: "Camisa Linho Italiana", brand: "Emporio Armani", category: "camisas", price: 789, image: shirt1, colors: [{name:"Off-White",hex:"#f5f0e8"},{name:"Areia",hex:"#d4c4a8"}], sizes: baseSizes, description: "Linho italiano 100% natural. Caimento impecável para ocasiões refinadas." },
  { id: "3", variantId: "10003", name: "Bermuda Chino Sarja", brand: "Tommy Hilfiger", category: "bermudas", price: 329, image: bermuda1, colors: [{name:"Caqui",hex:"#c8a878"},{name:"Marinho",hex:"#1a2540"}], sizes: ["38","40","42","44","46"], description: "Sarja de algodão pesado com elastano. Conforto e elegância para o dia a dia." },
  { id: "4", variantId: "10004", name: "Calça Alfaiataria Slim", brand: "Hugo Boss", category: "calcas", price: 899, image: pants1, colors: [{name:"Preto",hex:"#000"},{name:"Marinho",hex:"#0a1530"}], sizes: ["38","40","42","44","46","48"], description: "Lã italiana fria com toque sedoso. Corte slim moderno com bainha viva.", isNew: true },
  { id: "5", variantId: "10005", name: "Polo Manga Curta Pima", brand: "Ralph Lauren", category: "polos", price: 389, image: polo2, colors: [{name:"Marinho",hex:"#0a1530"},{name:"Bordô",hex:"#5a0e1e"}], sizes: baseSizes, description: "Algodão Pima de fibra longa. Toque macio e durabilidade superior." },
  { id: "6", variantId: "10006", name: "Camisa Oxford Tailored", brand: "Calvin Klein", category: "camisas", price: 549, oldPrice: 699, image: shirt2, colors: [{name:"Grafite",hex:"#2a2a2e"},{name:"Preto",hex:"#000"}], sizes: baseSizes, description: "Tecido oxford encorpado, corte tailored. Versatilidade entre o casual e o social.", isNew: true },
  { id: "b1", variantId: "20001", name: "Bermuda Chino Premium CN", brand: "CN Store", category: "bermudas", price: 119.90, image: bermuda1, colors: [{name:"Marinho",hex:"#1a2540"},{name:"Preto",hex:"#000"}], sizes: ["38","40","42","44","46"], description: "Bermuda chino em sarja premium com leve elastano. Corte reto, cintura confortável e acabamento impecável." },
  { id: "b2", variantId: "20002", name: "Bermuda Chino Sahara", brand: "CN Store", category: "bermudas", price: 129.90, image: bermuda2, colors: [{name:"Cáqui",hex:"#c8a878"}], sizes: ["38","40","42","44","46"], description: "Tom cáqui versátil em sarja resistente. Ideal para o dia a dia com estilo." },
  { id: "b3", variantId: "20003", name: "Bermuda Linho Areia", brand: "CN Store", category: "bermudas", price: 149.90, image: bermuda3, colors: [{name:"Areia",hex:"#d4c4a8"}], sizes: ["38","40","42","44","46"], description: "Linho leve e fresco para os dias quentes. Caimento fluido, conforto absoluto.", isNew: true },
  { id: "b4", variantId: "20004", name: "Bermuda Tech Graphite", brand: "CN Store", category: "bermudas", price: 139.90, image: bermuda4, colors: [{name:"Grafite",hex:"#2a2a2e"}], sizes: ["38","40","42","44","46"], description: "Tecido técnico com toque sedoso, secagem rápida e resistência ao amassado." },
  { id: "c1", variantId: "30001", name: "Cap Black Patch CN", brand: "CN Store", category: "bones", price: 89.90, oldPrice: 129.90, image: cap1, colors: [{name:"Preto",hex:"#000"}], sizes: ["Único"], description: "Boné dad hat em algodão pesado com patch bordado. Aba curva e fechamento ajustável." },
  { id: "c2", variantId: "30002", name: "Cap Desert Sand", brand: "CN Store", category: "bones", price: 94.90, image: cap2, colors: [{name:"Caramelo",hex:"#a8794a"}], sizes: ["Único"], description: "Tom terroso atemporal em sarja encorpada. Coroa estruturada e snap traseiro.", isNew: true },
  { id: "c3", variantId: "30003", name: "Cap Off White Minimal", brand: "CN Store", category: "bones", price: 84.90, image: cap3, colors: [{name:"Off-White",hex:"#f5f0e8"}], sizes: ["Único"], description: "Branco minimalista sem logo aparente. Para quem deixa o estilo falar." },
  { id: "c4", variantId: "30004", name: "Cap Royal Crest Gold", brand: "CN Store", category: "bones", price: 119.90, oldPrice: 149.90, image: cap4, colors: [{name:"Marinho",hex:"#0a1530"}], sizes: ["Único"], description: "Bordado dourado em fio metálico sobre marinho profundo. Detalhe de luxo." },
];

export const CHECKOUT_DOMAIN = "https://cnstore.lojavirtualnuvem.com.br";

export function buildCheckoutUrl(items: { variantId: string; quantity: number }[]) {
  if (items.length === 0) return CHECKOUT_DOMAIN;
  const first = items[0];
  const params = items.slice(1).map(i => `&variant_id[]=${i.variantId}&quantity[]=${i.quantity}`).join("");
  return `${CHECKOUT_DOMAIN}/cart/add/?variant_id=${first.variantId}&quantity=${first.quantity}${params}`;
}
