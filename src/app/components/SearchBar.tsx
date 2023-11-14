"use client";

import React, { Suspense, useEffect} from "react";
import { useState } from "react";
import SearchResults from "./SearchResults";

export function SuspenseResults() {
  return (
    <>
      <div className="absolute left-0 top-full z-10 mt-2 flex w-full text-white sm:w-3/4 lg:w-full backdrop-blur-3xl">
        <div className="max-h-96 w-full max-w-lg animate-pulse flex-col space-y-4 overflow-auto rounded-md border-2 border-white bg-opacity-70 p-5 ">
          <div className="flex flex-row justify-between">
            <h1 className="h-6 w-1/4 animate-pulse bg-slate-600 text-2xl font-semibold"></h1>
          </div>
          <ul className="text-base space-y-4">
            <li className="h-6 animate-pulse bg-slate-600 p-2 text-sm"></li>
            <li className="h-6 animate-pulse bg-slate-600 p-2 text-sm"></li>
            <li className="h-6 animate-pulse bg-slate-600 p-2 text-sm"></li>
            <li className="h-6 animate-pulse bg-slate-600 p-2 text-sm"></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default function SearchBar() {
  const [, setQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [delayedQuery, setDelayedQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        setDelayedQuery(value);
      }, 500),
    );
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="relative rounded-md bg-[#202031] p-1 ">
      <input
        className="rounded-full border-transparent bg-inherit px-2 outline-none transition-all duration-300 ease-in-out sm:px-4 sm:focus:pr-32 lg:focus:pr-72"
        placeholder="Pesquise um mangá..."
        type="text"
        onChange={handleInputChange}
      />
      {delayedQuery && (
        <Suspense fallback={<SuspenseResults />}>
          <SearchResults input={delayedQuery} />
        </Suspense>
      )}
    </div>
  );
}
