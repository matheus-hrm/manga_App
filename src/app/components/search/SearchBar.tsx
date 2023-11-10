'use client'
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";
import searchManga from "./apiSearch";


type InputQuery = {
    input: string

}

type MangaData = {
    id: string
    type: string
    titleen: string
    titleptbr: string


}[]

async function getSearchResponse(query: InputQuery) {
    const data = await searchManga(query.input) as MangaData;
    return data;
}

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<MangaData>([]);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null as unknown as ReturnType<typeof setTimeout>);
    
    useEffect(() => {
        getSearchResponse({ input: query }).then((data) => {
        setResults(data)
        setLoading(false)
        }).catch((err) => {
            console.error(err);
        })
    }
    , [query]);
        

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (value) {

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
                            {results.map((manga: {id: string, titleen: string, titleptbr: string }, index) => (
                                <li key={index} className='p-2 text-sm'>
                                    <Link href={`/${manga.id}`}>
                                        <h2>{manga.titleen}</h2>
                                        <h2>{manga.titleptbr}</h2>
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


