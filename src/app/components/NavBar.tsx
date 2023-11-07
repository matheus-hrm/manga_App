import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex space-x-2 px-4 lg:space-x-8 sm:text-sm ">
        <li>
          <Link href="/" >
            <p className="text-white py-1 border-transparent hover:border-b-white border-2 transition duration-200 ease-in-out sm:text-sm">Início</p>
          </Link>
        </li>
        <li>
          <SignInButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
