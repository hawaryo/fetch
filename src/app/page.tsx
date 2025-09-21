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
  total: number;
}
export default function Home() {
  const [data, setData] = useState<data | null>(null);
  const [action, setAction] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const NumberOfCards = 5;
  const MaxNumOfPages = data ? Math.ceil(data.total / NumberOfCards) : 0;

  async function handleClick(skip: number, actionName: string) {
    setErrorMassage("");

    try {
      setAction(actionName);
      const res = await fetch(
        `https://dummyjson.com/products?limit=5&skip=${skip}&select=title,price,thumbnail`
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
      setAction("");
    }
  }

  //change button background while loading
  const initialLoadButtonClass = `border p-2 block mx-auto mt-4 ${
    action === "initialLoad" ? "bg-amber-200" : ""
  }`;

  const backwardButtonClass = `border p-2 ${
    action === "backward" || pageNum === 1 ? "bg-gray-200" : ""
  }`;

  const ForwardButtonClass = `border p-2 ${
    action === "forward" || pageNum === MaxNumOfPages ? "bg-gray-200" : ""
  }`;

  return (
    <>
      <button
        className={initialLoadButtonClass}
        onClick={() => {
          handleClick(0, "initialLoad");
          setPageNum(1);
        }}
        disabled={action !== ""}
        aria-label="get products"
      >
        {action === "initialLoad" ? "loading..." : "get Products"}
      </button>
      {errorMassage && (
        <p className="bg-red-400 text-amber-50 p-2 w-[12rem] mx-auto text-center my-2">
          {errorMassage}
        </p>
      )}
      {data && (
        <>
          {/* product cards */}
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(15.5rem,17rem))] content-center items-stretch gap-2 p-4 max-w-[109rem] mx-auto">
            {data.products.map((n: products) => (
              <ProductCard
                key={n.id}
                price={n.price}
                title={n.title}
                image={n.thumbnail}
              />
            ))}
          </div>
          {/* pagination */}
          <div className="flex justify-center items-center gap-20">
            <button
              className={backwardButtonClass}
              onClick={() => {
                handleClick(data!.skip - NumberOfCards, "backward");
                setPageNum(pageNum - 1);
              }}
              disabled={pageNum === 1 || action !== ""}
              aria-label="previous page"
            >
              {"<"}
            </button>
            <p className="text-lg">{pageNum}</p>
            <button
              className={ForwardButtonClass}
              onClick={() => {
                handleClick(data!.skip + NumberOfCards, "forward");
                setPageNum(pageNum + 1);
              }}
              disabled={pageNum === MaxNumOfPages || action !== ""}
              aria-label="next page"
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
