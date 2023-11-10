"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";
import searchManga from "../api/apiSearch";


type InputQuery = {
  input: string;
};

type MangaData = {
  id: string;
  title: string;
}[];

async function getSearchResponse(query: InputQuery) {
  const data = (await searchManga(query.input)) as MangaData;
  return data;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MangaData>([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(
    null as unknown as ReturnType<typeof setTimeout>,
  );


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
    }
    if (value) {
        setLoading(true);
        timeoutRef.current = setTimeout(() => {
            getSearchResponse({ input: value })
                .then((data) => {
                    setResults(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        }, 1000);
    } else {
        setLoading(false);
        setResults([]);
    }
};
  const searchRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setQuery("");
      }
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setQuery("");
          handleClickOutside(e);
        }
      });
    };
  }, []);

  return (
    <div className="relative rounded-md bg-[#202031] p-1 " ref={searchRef}>
      <input
        className="rounded-full border-transparent bg-inherit px-2 outline-none transition-all duration-300 ease-in-out sm:px-4 sm:focus:pr-32 lg:focus:pr-72"
        placeholder="Pesquise um mangá..."
        type="text"
        onChange={handleInputChange}
      />
      {query && (
        <div className="absolute left-0 top-full z-10 mt-2 flex  w-full text-white sm:w-3/4 lg:w-full">
          <div className="max-h-96 w-full max-w-lg flex-col space-y-4 overflow-auto rounded-md border-2 border-white bg-opacity-70  p-5 backdrop-blur-3xl">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold">Resultados</h1>
              {loading && (
                <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin" />
              )}
              <button onClick={() => setQuery("")} className="bg-slate-950 p-2">
                <AiOutlineClose />
              </button>
            </div>
            <ul className="text-base">
              {results.map((manga: { id: string; title: string }, index) => (
                <li key={index} className="p-2 text-sm">
                  <Link href={`/${manga.id}`}>
                    <h2>{manga.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
