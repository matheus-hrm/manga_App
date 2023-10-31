import Link from "next/link";

export default function page() {
  return (
    <>
    <div className='bg-[#03001C] w-screen h-screen'>
      <div className='flex flex-col items-center justify-center h-full'>
        <form>
          <h1>register</h1>
          <p>faça o <Link href='/login'>login</Link></p>
        </form>
      </div>
    </div>
    </>
  )
}