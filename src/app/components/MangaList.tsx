import Link from 'next/link';
import listMangas from '../api/listMangas';
import Image from 'next/image';



export async function MangaList() {
  let manga = [];
  manga = await listMangas();

  return (
    <>
    <div className='flex flex-wrap items-center px-5 py-3 sm:flex-wrap xl:flex-nowrap '>
      {manga?.map((manga) => (
        <div key={manga.name} className='relative group m-2 flex flex-col items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
          <Link href={`/${manga.id}`} className=' block'>
            <div className='overflow-hidden min-h-fit sm:w-fit'>
              <Image
                src={manga.image}
                alt={manga.name}
                width={100} // Largura máxima
                height={150} // Altura máxima
                className=' max-h-36 object-contain transform transition-transform group-hover:scale-110 overflow-hidden sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-64'
              />
              <p
                className='top-0 left-0 absolute text-center p-2 hidden w-full h-full bg-black bg-opacity-10 group-hover:block group-hover:opacity-100 hover:scale-110 bg-gradient-to-b from-black to-transparent transition-all duration-150 ease-in-out '>
                {manga.name}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
    </>
  )
}

