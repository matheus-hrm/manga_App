import Link from 'next/link'


export default function login() {
  return (
    <>
      <div className='bg-[#03001C] w-screen h-screen'>
      <div className='flex flex-col items-center justify-center h-full'>
        <Link className='text-white p-8' href="/">Home</Link>
        <form className="flex flex-col p-24 bg-white rounded-xl justify-around space-y-10">
          <input 
            type='text' 
            placeholder='Usuário' 
            className='bg-inherit p-4 space-y-3 placeholder:text-black outline-none focus:border-b-2 border-black transition duration-500 ease-in-out' 
          />
          <input 
            type='password' 
            placeholder='Senha' 
            className='bg-inherit p-4 space-y-3 placeholder:text-black outline-none focus:border-b-2 border-black transition duration-500 ease-in-out' 
          />
          <button 
            type='submit' 
            className='bg-[#03001C] text-white p-4 rounded-xl mt-4'
          >
            Entrar
          </button>
        <p className='text-muted:sm text-gray-600 '>Ainda não tem uma conta ? faça o {`cadastro`}</p>
        </form>
      </div>
    </div>
    
    </>
  )
}