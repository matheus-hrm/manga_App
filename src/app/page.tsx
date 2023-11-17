import Link from 'next/link'
import { MangaList } from './components/MangaList';
import Footer from './components/footer';
import Header from './components/Header';
import { Suspense } from 'react';
import { HomeSkeleton } from './components/HomeSkeleton';

const rating = {
  order: {
    rating: 'desc'
  },
  limit: 10
}

const seguidos = {
  order: {
    followedCount: 'desc'
  },
  limit: 10
}



export default function Home() {

  return (
    <>
      <div className="text-white h-screen w-screen overflow-scroll">
        <Header />
        <Suspense fallback={<HomeSkeleton />}>
          <h1 className='text-2xl p-5 ml-6 font-thin'>Mangás em destaque</h1>
          <MangaList params={seguidos}/>
          <h1 className='text-2xl p-5 ml-6 font-thin'>Mais bem avaliados</h1>
          <MangaList params={rating} />
        </Suspense>
        <Link href="/login" className='p-4 '>Login</Link>
        <div className='bottom-0'>
          <Footer />
        </div>
      </div>
    </>
  )
}