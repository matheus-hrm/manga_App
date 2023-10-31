import Link from "next/link";

export default function page() {
  return (
    <>
    <div className='bg-[#03001C] w-screen h-screen'>
      <div className='flex flex-col items-center justify-center h-full'>
        <form>
          <input type='text' placeholder='Nome' className='bg-inherit p-4 space-y-3 placeholder:text-black outline-none focus:border-b-2 border-black transition duration-500 ease-in-out' />
          <p>faça o <Link href='/login'>login</Link></p>
        </form>
      </div>
    </div>
    </>
  )
}