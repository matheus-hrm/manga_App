import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold text-white">MangaSite</Link>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link href="/" className="text-white hover:text-blue-300">Início</Link></li>
                    <li><Link href="/" className="text-white hover:text-blue-300">Mangás</Link></li>
                    <li><Link href="/" className="text-white hover:text-blue-300">Sobre Nós</Link></li>
                    <li><Link href="/" className="text-white hover:text-blue-300">Contato</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header