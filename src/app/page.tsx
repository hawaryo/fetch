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
  const [loading, setloading] = useState(false);

  async function handleClick() {
    try {
      setloading(true);
      const res = await fetch(
        "https://dummyjson.com/products?limit=5&skip=0&select=title,price,thumbnail"
      );
      const json: data = await res.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  //change button background while loading
  const buttonClass = `border p-2 block mx-auto mt-4 ${
    loading ? "bg-amber-200" : ""
  }`;
  return (
    <>
      <button className={buttonClass} onClick={handleClick}>
        {loading ? "loading..." : "get Products"}
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
