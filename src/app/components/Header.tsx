import React from 'react'

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <a href="#" className="text-3xl font-bold text-white">MangaSite</a>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-white hover:text-blue-300">Início</a></li>
                    <li><a href="#" className="text-white hover:text-blue-300">Mangás</a></li>
                    <li><a href="#" className="text-white hover:text-blue-300">Sobre Nós</a></li>
                    <li><a href="#" className="text-white hover:text-blue-300">Contato</a></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header