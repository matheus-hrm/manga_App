import Link from 'next/link'
import listMangas from './api/listMangas';

export default async function Home() {

  let manga = [];   
  manga = await listMangas();

  //console.log(manga);

  return (
    <div className="flex flex-col justify-center items-center text-white bg-black h-screen w-screen overflow-scroll">
      <ul className='flex flex-row space-y-4 overflow-scroll'>
        {manga?.map((manga) => (
          <li key={manga.name} className='flex flex-col space-y-4'>
            <a href={`/manga/${manga.id}`}>
              <p>{manga.name}</p>
            </a>
            <img src={manga.image} alt={manga.name} />
          </li>
        ))}
      </ul>
      <Link href="/login">Login</Link>
    </div>

  )
}