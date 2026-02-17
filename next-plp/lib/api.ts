import { Product } from "./types";

const API = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`, {
    // Server-side rendering (no client fetch)
    cache: "no-store"
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API}/products/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
