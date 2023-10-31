import Link from "next/link"

export default function Home(){  
  
  return (
    <div className="flex flex-col justify-center items-center text-white bg-black h-screen">
      <h1>hello World</h1>
      <Link href="/login">Login</Link>
    </div>
  )
}




