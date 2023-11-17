import Link from 'next/link'
import { MangaList } from './components/MangaList';
import Footer from './components/footer';
import Header from './components/Header';
import { Suspense } from 'react';

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

export function HomeSkeleton() {
  return (
    <>
    <div className="flex flex-wrap items-center px-5 py-3 sm:flex-wrap xl:flex-nowrap ">
    {Array(10).fill(0).map((_, index) => (
      <div
        key={index}
        className="group relative m-2 flex max-w-xs flex-col items-center sm:max-w-sm md:max-w-md lg:max-w-lg  animate-pulse bg-gray-400"
      >
        <div className="relative min-h-fit overflow-hidden h-36 w-24 sm:h-48 sm:w-32 md:h-60 md:w-40">
        </div>
      </div>
    ))}
  </div>
  <div className="flex flex-wrap items-center px-5 py-3 sm:flex-wrap xl:flex-nowrap ">
    {Array(10).fill(0).map((_, index) => (
      <div
        key={index}
        className="group relative m-2 flex max-w-xs flex-col items-center sm:max-w-sm md:max-w-md lg:max-w-lg  animate-pulse bg-gray-400"
      >
        <div className="relative min-h-fit overflow-hidden h-36 w-24 sm:h-48 sm:w-32 md:h-60 md:w-40 ">
        </div>
      </div>
    ))}
  </div>
  </>
  )
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