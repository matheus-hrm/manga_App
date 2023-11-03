import Link from "next/link";
import Footer from "~/app/components/footer";

export default function page() {
  return (
    <>
      <div className='w-screen h-screen bg-[url("/c95cc53698f201e58a1fc38167146021-urNELtV5C.png")] bg-no-repeat  bg-[150%] sm:bg-[320%] md:bg-[-10%] xl:bg-[-25%]' >
        <div className='flex flex-col items-center justify-center h-full pt-16'>
          <Link className='text-white p-8' href="/">Home</Link>
          <form className="flex flex-col p-8 bg-white rounded-md justify-around space-y-10 md:p-16 lg:p-24  ">
            <h1 className='text-2xl md:text-3xl font-semibold text-center'>Cadastro</h1>
            <input 
              type='text' 
              placeholder='Seu nickname' 
              className='bg-inherit p-4 space-y-3 border-transparent outline-none  placeholder:text-black  focus:border-b-black border-2 transition duration-500 ease-in-out' 
            />
            <input 
              type='text' 
              placeholder='Seu email' 
              className='bg-inherit p-4 space-y-3 border-transparent outline-none  placeholder:text-black  focus:border-b-black border-2 transition duration-500 ease-in-out'  
            />
            <input 
              type='password' 
              placeholder='Sua senha' 
              className='bg-inherit p-4 space-y-3 border-transparent outline-none  placeholder:text-black  focus:border-b-black border-2 transition duration-500 ease-in-out' 
            />
            <button 
              type='submit' 
              className='bg-[#03001C] text-white p-4 rounded-xl mt-4'
            >
              Entrar
            </button>
          <p className='text-muted:sm text-gray-600 '>Ainda não tem uma conta? faça o <Link href='/login' className='text-teal-500'>login</Link></p>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  )
}