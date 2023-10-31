"use client"
import React, { useState } from 'react';

const BASE_URL = 'https://api.mangadex.org';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchManga = async (query) => {
    const response = await fetch(`${BASE_URL}/manga?title=${query}`);
    const json = await response.json();
    const data = json.data;

    setResults(data);
  }

  return (
    <div>
      <h1>Search</h1>
      <input type="text" onChange={(e) => {setQuery(e.target.value); searchManga(e.target.value);}} />
      <h1>Resultados</h1>
      <div className="flex flex-col justify-center items-center text-white bg-black h-screen w-screen overflow-scroll">
        <ul className="flex flex-col space-y-4">
          {results.map((result, index) => (
            <li key={index}>
              <h2>{result.attributes.title.en}</h2>
              <h3>{result.attributes.description.pt}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
