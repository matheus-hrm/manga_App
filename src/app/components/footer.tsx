import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-between items-center text-white bg-[#03001F] p-2 md:p-16 lg:flex-row xl:flex-row " >
      <div className="flex flex-col text-sm items-center justify-center pt-16 space-y-2 md:text-md">
        <div className="flex flex-row gap-x-4 items-center justify-center pb-4 md:space-x-4">                                 
          <p>Contato</p>
          <p>Termos de uso</p>
          <p>Política de privacidade</p>
        </div>
        <div className="flex flex-col space-y-4 items-center pb-12 text-md">
          <p>© 2023 - Todos os direitos reservados</p>
          <p className="">Desenvolvido por </p>
          <div className="flex flex-row space-x-4 justify-center items-center">
            <Link target="_blank"  href="https://github.com/matheus-hrm">
              <div className=" bg-slate-800 px-5 py-2 rounded-2xl flex justify-between items-center flex-row">
                <img src='https://avatars.githubusercontent.com/u/49960367?v=4' alt="Matheus Henrique" className="rounded-full w-8 h-8" />
                <h1 className="text-white text-sm px-2">matheus</h1>
              </div>
            </Link>
            <Link target="_blank"  href="https://github.com/rafaelalmeidaV">
              <div className=" bg-slate-800 px-7 py-2 rounded-2xl flex  flex-row justify-between items-center">
                <img src='https://avatars.githubusercontent.com/u/104868359?v=4' alt="Rafael Almeida" className="rounded-full w-8 h-8" />
                <h1 className="text-white text-sm px-2">rafael </h1>
              </div>
            </Link>
          </div>
        </div> 
      </div>
      <div className="flex flex-col text-sm hiden justify-center items-center md:text-md md:flex sm:py-24 md:mr-14">
        <h1>Logo</h1>
      </div>
      <div className="flex text-sm flex-col justify-center  md:text-md">
        <p className="p-2 mb-4">Encontrou algum bug? Fale com a gente!</p>
        <input type="text" placeholder="Digite seu e-mail" className="bg-inherit p-3  text-black placeholder:text-black outline-none bg-white focus:border-2 border-sky-500  rounded-md" />
        <textarea placeholder="Descreva o problema" className="bg-inherit p-2 mt-2 text-black placeholder:text-black outline-none bg-white focus:border-2 border-sky-500 rounded-md " />
      </div>
    </footer>
  )
}

/*

            e
            <Link target="_blank" className="p-1  text-orange-400" href="https://github.com/rafaelalmeidaV"> Rafael Almeida</Link>
*/