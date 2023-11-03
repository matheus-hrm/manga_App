import Link from 'next/link'
import Footer from '~/app/components/footer'

export default function login() {
  return (
    <>
      <div className='bg-[#03001C] w-screen h-screen'>
        <img src='https://github.com/matheus-hrm/api_fetch/blob/main/public/gojo.jpg' alt='' className=' w-1/2 h-1/2 z-40 absolute'   ></img>
        <div className='flex flex-col items-center justify-center h-full'>
          <Link className='text-white p-8' href="/">Home</Link>
          <form className="flex flex-col p-8 bg-white rounded-md justify-around space-y-10 md:p-16 lg:p-24  ">
            <h1 className='text-2xl md:text-3xl font-semibold text-center'>Login</h1>
            <input 
              type='text' 
              placeholder='Usuário' 
              className='bg-inherit p-4 space-y-3  placeholder:text-black outline-none focus:border-b-2 border-black transition duration-500 ease-in-out' 
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
          <p className='text-muted:sm text-gray-600 '>Ainda não tem uma conta ? faça o <Link href='/register'>cadastro</Link></p>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  )
}