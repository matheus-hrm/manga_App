import Link from 'next/link'
import { MangaList } from './components/MangaList';
import Footer from './components/footer';
import Header from './components/Header';

export default function Home() {

  return (
    <>

      <div className=" text-white h-screen w-screen overflow-scroll">
        <Header />
        <MangaList />
        <MangaList />
        <MangaList />
        <Link href="/login" className='p-4 '>Login</Link>
        <div className='bottom-0'>
          <Footer />
        </div>
      </div>
    </>
  )
}