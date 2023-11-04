import Link from 'next/link';
import listMangas from '../api/listMangas';
import Image from 'next/image';



export async function MangaList() {
  let manga = [];
  manga = await listMangas();

  return (
    <>
    
      <ul className='grid px-1 py-3 overflow-x-auto overflow-y-hidden sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 ' >

        {manga?.map((manga) => (
          <li key={manga.name} className='relative group '>
            <Link href={`/manga/${manga.id}`} className=' block'>
              <div className='min-h-full min-w-[150px] m-2'>
                <Image
                  src={manga.image}
                  alt={manga.name}
                  width={512} // Largura máxima
                  height={150} // Altura máxima
                  className='min-h-[280px] min-w-[150px] transform transition-transform group-hover:scale-110 overflow-hidden'
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

