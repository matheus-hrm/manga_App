"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';


const BASE_URL = 'https://api.mangadex.org';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = React.useRef(null as unknown as ReturnType<typeof setTimeout>);

  const searchManga = async (query: string) => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/manga?title=${query}`);
    const json = await response.json();
    const data = json.data;

    setResults(data);
    setLoading(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);  

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (value) {
        searchManga(value);
      }
    }, 1000);
  }


  return (
    <div className='bg-[#03001A] flex flex-row mr-5'>
      <input className='pr-48 bg-inherit border-transparent outline-none border-b-white border-2 focus:border-collapse transition duration-200 ease-in-out ' placeholder='Pesquise um mangá...' type="text" onChange={handleInputChange} />
      {query && (
        <>
          <div className="bg-[#03001F] max-w-1/2  fixed top-0 left-0 w-full h-full text-white bg-opacity-80 flex justify-center items-center z-10 ">
            <div className="flex-col p-5 rounded-md  max-w-lg w-full space-y-4 overflow-auto max-h-96 border-4 border-white bg-slate-950 m-32">
              <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold'>Resultados</h1>
                {loading && <AiOutlineLoading3Quarters className="animate-spin w-8 h-8" />}
                <button onClick={() => setQuery('')} className='p-2 bg-slate-950'>
                  <AiOutlineClose />
                </button>
              </div>
              <ul className='text-base'>
                {results.map((result: {id: string, attributes: {title: {[x: string]:string}}}, index) => (
                  <li key={index} className='p-2 text-sm'>
                    <Link href={`/${result.id}`}>
                      <h2>{result.attributes.title.en}</h2>
                      <h2>{result.attributes.title['pt-br']}</h2>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  ) 
}