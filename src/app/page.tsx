import Link from 'next/link'
import { MangaList } from './components/MangaList';
import Footer from './components/footer';
import Header from './components/Header';

export default function Home() {

  return (
    <>
      <div className="text-white h-screen w-screen overflow-scroll">
        <Header />
        <h1 className='text-2xl p-5 ml-6 font-thin'>Mangás em destaque</h1>
        <MangaList />
        <h1 className='text-2xl p-5 ml-6 font-thin'>Mais recentes</h1>
        <MangaList />
        <h1 className='text-2xl p-5 ml-6 font-thin'>Alguma coisa</h1>
        <MangaList />
        <Link href="/login" className='p-4 '>Login</Link>
        <div className='bottom-0'>
          <Footer />
        </div>
      </div>
    </>
  )
}