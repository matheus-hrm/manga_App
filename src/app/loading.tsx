import React from 'react'
import Header from './components/Header'
import Footer from './components/footer'

const Loading = () => {
  return (
    <>
    <Header/>
    <h1 className='flex items-center justify-center text-3xl text-white '>Carregando...</h1>
    <Footer/>
    </>
  )
}

export default Loading