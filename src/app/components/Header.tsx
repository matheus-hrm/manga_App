import Link from 'next/link'
import React from 'react'
import NavBar from './NavBar'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header className="bg-[rgb(12,12,29)] p-6">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className=" hidden sm:block sm:text-2xl md:text-4xl font-semibold text-white">mangás</Link>
            <div className='flex flex-row space-x-2'>
            <SearchBar />
            <NavBar/>
            </div>
        </div>
    </header>
  )
}

export default Header