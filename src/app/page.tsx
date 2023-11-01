import Link from 'next/link'
import listMangas from './components/listMangas'
import fetchCovers from './components/fetchCovers'

export default async function Home() {
  
  const data = await listMangas()
  const mangaIds = data.mangaIds
  const coverFileNames = data.coverFileNames
  

  return (
    <div className="flex flex-col justify-center items-center text-white bg-black h-screen w-screen overflow-scroll">
      <ul className='flex flex-col space-y-4'>
        {/* {data.map((manga) => (
          <li key={manga.id}>
            <h1>{manga.attributes.title.en}</h1>
            <h1>Id do mangá </h1>
            <p className='text-red-600'>{manga.relationships[2].id }</p>
            <h1>Capítulos</h1>
            
          </li>
        ))} */}
        <p></p>
      </ul>
      <Link href="/login">Login</Link>
    </div>
  )
}