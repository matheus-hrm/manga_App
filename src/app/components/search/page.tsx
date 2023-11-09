"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';

type MangaData = {
  id: string
  type: string
  attributes: {
    title: {
        "pt-br": string
        en: string
        "ja-ro": string
    }
    altTitles: [
        {
          en: string
          "ja-ro": string
          "pt-br": string
        }
    ]
    description: {
      en: string
      "pt-br": string
    }
    publicationDemographic: string
    status : string
    year: number
    contentRating: string
    tags: [
      {
        id: string
        type: string
        attributes: {
          name: {
            en: string
            "ja-ro": string
            "pt-br": string
          }
        }
      }
    ]
    version: number
  }
  relationships: [
    {
      id: string
      type: string
    }
  ]
  links: {
    self: string
  }
  createdAt: string
  updatedAt: string

}
const BASE_URL = 'https://api.mangadex.org';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MangaData[]>([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null as unknown as ReturnType<typeof setTimeout>);

  const searchManga = async (query: string) => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/manga?title=${query}`);
    const json = await response.json() as {data: MangaData[]};
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
        searchManga(value).then(() => {
          timeoutRef.current = null;
        }).catch((err) => {
          console.error(err);
        })
      }
    }, 1000);
  }
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setQuery('');
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setQuery('');
      }
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setQuery('');
          handleClickOutside(e);
        }
      }); 
    };  
  }, []);
  
  return (
    <div className="relative bg-[#202031] rounded-md p-1 " ref={searchRef}>
      <input 
        className='px-2 bg-inherit rounded-full border-transparent outline-none transition-all duration-300 ease-in-out sm:px-4 lg:focus:pr-72 sm:focus:pr-32' 
        placeholder='Pesquise um mangá...' 
        type="text" 
        onChange={handleInputChange} 
      />
      {query && (
        <div className="absolute w-full top-full mt-2 left-0 text-white  flex z-10 sm:w-3/4 lg:w-full">
          <div className="flex-col p-5 rounded-md max-w-lg w-full space-y-4 overflow-auto max-h-96 border-2 border-white  backdrop-blur-3xl bg-opacity-70">
            <div className='flex flex-row justify-between'>
              <h1 className='text-2xl font-semibold'>Resultados</h1>
              {loading && <AiOutlineLoading3Quarters className="animate-spin w-8 h-8" />}
              <button onClick={() => setQuery('')} className='p-2 bg-slate-950'>
                <AiOutlineClose />
              </button>
            </div>
            <ul className='text-base'>
              {results.map((result: {id: string, attributes: {title: Record<"pt-br" | "en", string>}}, index) => (
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
      )}
    </div>
  ) 
}