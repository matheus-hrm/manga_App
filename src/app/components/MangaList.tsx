import Link from 'next/link';
import listMangas from '../api/listMangas';
import Image from 'next/image';


export async function MangaList() {
  let manga = [];   
  manga = await listMangas();
  
  return (
    <>
      <ul className='grid grid-cols-10 px-1 py-3 overflow-x-auto overflow-y-hidden'>
        {manga?.map((manga) => (
          <li key={manga.name } className='relative group p-1 '>
            <Link href={`/manga/${manga.id}`} className=' block'>
              <div className='relative max-h-48'>
                <Image 
                  src={manga.image} 
                  alt={manga.name} 
                  width={120} 
                  height={180}  
                  className='object-contain w-full transform transition-transform group-hover:scale-110  overflow-hidden'
                />
                <p 
                  className='top-0 left-0 absolute text-center p-2 hidden w-full h-full bg-black bg-opacity-10 group-hover:block group-hover:opacity-100 hover:scale-110 bg-gradient-to-b from-black to-transparent transition-all duration-150 ease-in-out'>
                  {manga.name}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

