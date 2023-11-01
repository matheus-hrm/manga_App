import Link from 'next/link'
import listMangas from './components/listMangas'
import react from 'react'
import queryParams from './components/listMangas'


const Params = queryParams

export default async function Home() {
  
  const response = await fetch('https://api.mangadex.org/manga?limit=5&offset=0&order[rating]=desc', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json = await response.json();
  const data = await listMangas();
  const mangaIds = data.mangaIds;
  const coverFileNames = data.coverFileNames;

  return (
    <div className="flex justify-center items-center text-white bg-black h-screen w-screen overflow-scroll">
      <ul >
         {json.data.map((manga: any, index: number) =>( 
            <div key={index}>
              <Link href={`/manga/${manga.id}`}>
                <div className='flex flex-row justify-center items-center p-4 overflow-scroll'>
                  <img
                    src={`https://uploads.mangadex.org/covers/${manga.id}/${coverFileNames[index]}.256.jpg`} 
                    alt={manga.attributes.title.en} 
                    width={'100'} 
                    height={'100'}
                    />
                  <p className='text-sm'>{manga.attributes.title.en}</p>
                </div>
              </Link>
            </div>
          ))}
      </ul>
      <Link href="/login">Login</Link>
    </div>
  
  )
} 