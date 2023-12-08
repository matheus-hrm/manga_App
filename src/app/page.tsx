import { MangaList } from './components/MangaList';
import Footer from './components/footer'
import Header from './components/Header';
import { Suspense } from 'react';
import { HomeSkeleton } from './components/HomeSkeleton';
import { HomeCarousel } from './components/HomeCarousel';

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
        <div className='flex items-center justify-center'>
        <HomeCarousel />
        </div>
        <Suspense fallback={<HomeSkeleton />}>
          <h1 className='text-2xl p-5 ml-6 font-thin'>Mangás em destaque</h1>
          <MangaList params={seguidos}/>
          <h1 className='text-2xl p-5 ml-6 font-thin'>Mais bem avaliados</h1>
          <MangaList params={rating} />
        </Suspense>
        <div className='bottom-0'>
          <Footer />
        </div>
      </div>
    </>
  )
}