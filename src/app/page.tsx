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
  const [loading, setLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");

  async function handleClick() {
    setErrorMassage("");
    try {
      setLoading(true);
      const res = await fetch(
        "https://dummyjson.com/products?limit=5&skip=0&select=title,price,thumbnail"
      );

      if (!res.ok) {
        throw new Error(`Network Error ${res.status}`);
      }
      const json: data = await res.json();
      setData(json);
    } catch (e) {
      if (e instanceof TypeError) {
        setErrorMassage("Please check your internet connection");
      } else if (e instanceof Error) {
        setErrorMassage(`unexpected error : ${e.message}`);
      } else {
        setErrorMassage("unexpected error");
      }
    } finally {
      setLoading(false);
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
      {errorMassage && (
        <p className="bg-red-400  text-amber-50 p-2 w-[200px] mx-auto text-center my-2">
          {errorMassage}
        </p>
      )}
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
