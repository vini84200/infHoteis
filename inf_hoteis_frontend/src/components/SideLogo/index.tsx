import Image from 'next/image'
import React from 'react'
import logo from "@assets/logo-icon.png";
import Link from 'next/link';

type Props = {}

export default function index({}: Props) {
  return (
    <div className={"md:block"}>
        <div className={"md:h-full bg-main-color"}>
          <div
              className={"font-sans font-normal text-6xl text-center text-red-700 h-full flex flex-row md:flex-col justify-center items-center m-0 p-5 md:p-0"}
          >
              <Link href={"/"} className={"hover:scale-110 no-underline visited:text-red-700 ease-in-out duration-700"}>
                <Image src={logo} alt="fodase" className={"h-20 mx-10 md:h-32 w-auto md:mb-5"}></Image>
                <span className={"hidden md:block"}>INF HOTÉIS</span>
              </Link>
          </div>
        </div>
    </div>
  )
}