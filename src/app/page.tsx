'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import listMangas from './components/listMangas';
import axios from 'axios';


export default function Home() {

  const [manga, setManga] = useState([]);

  const getManga = async () => {
    const response = await listMangas();
    setManga(response);
    console.log(response);
    
  }

  useEffect(() => {
    try {

      getManga();
    } catch (error) {
      console.log(error);
    }
  }, []);





  return (
    <div className="flex flex-col justify-center items-center text-white bg-black h-screen w-screen overflow-scroll">
      <ul className='flex flex-row space-y-4 overflow-scroll'>
        
        {manga?.map((manga) => (
          <li key={manga.name} className='flex flex-col space-y-4'>
            <Link href={`/manga/${manga.id}`}>
              <p>{manga.name}</p>
            </Link>
            <img src={manga.image} alt={manga.name} />
          </li>
        ))}

      </ul>
      <Link href="/login">Login</Link>
    </div>

  )
}