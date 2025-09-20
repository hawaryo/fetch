"use client";
import { useState } from "react";
import ProductCard from "./components/ProductCard";

interface products {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}
interface data {
  products: [];
  skip: number;
  limit: number;
}
export default function Home() {
  const [data, setData] = useState<data | null>(null);

  async function handleClick() {
    const res = await fetch(
      "https://dummyjson.com/products?limit=5&skip=0&select=title,price,thumbnail"
    );
    const json: data = await res.json();
    setData(json);
  }

  return (
    <>
      <button className="border p-2 block mx-auto mt-4" onClick={handleClick}>
        get Products
      </button>
      {data && (
        <div className="flex justify-center gap-2 p-4">
          {data.products.map((n: products) => (
            <ProductCard
              key={n.id}
              price={n.price}
              title={n.title}
              image={n.thumbnail}
            />
          ))}
        </div>
      )}
    </>
  );
}
