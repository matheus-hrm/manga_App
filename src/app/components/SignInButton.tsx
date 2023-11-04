'use client'
import Link from 'next/link'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'

const SignInButton = () => {
  return (
    <>
      <Link href={'/register'}>
      <BiUserCircle className="w-8 h-8"/>
      </Link>
    </>
  )
}

export default SignInButton