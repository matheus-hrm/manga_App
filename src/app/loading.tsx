import React from 'react'
import Header from './components/Header'
import Footer from './components/footer'

const Loading = () => {
  return (
    <>
    <Header/>
      <div className='text-white'>
      <div className='flex flex-wrap items-center px-5 py-3 sm:flex-wrap xl:flex-nowrap '>
        <div className='relative group m-2 flex flex-col items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
            <div className='overflow-hidden min-h-fit sm:w-fit'>
              <p className='top-0 left-0 absolute text-center p-2 hidden w-full h-full bg-black bg-opacity-10 group-hover:block group-hover:opacity-100 hover:scale-110 bg-gradient-to-b from-black to-transparent transition-all duration-150 ease-in-out '>
              </p>
            </div>
        </div>
    </div>
      </div>
    <Footer/>
    </>
  )
}

export default Loading