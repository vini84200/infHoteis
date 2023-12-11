'use client';
import React from 'react'
import {useQuery} from '@tanstack/react-query'
import getMe from "@/apiOperations/users/getMe";
import {Button, Spin} from "antd";
import Link from "next/link";

export default function Home() {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe()
  })
  if (meQuery.isPending) {
    return <Spin fullscreen delay={200}/>
  }
  if (meQuery.isError) {
    return (
      <div>Erro</div>)
  }
  return (
    <div className={"h-screen"}>
      <div className={"flex flex-col justify-center items-center h-screen"}>
        {meQuery.data?.logged_in ? (
          <div className={"flex flex-col justify-center items-center h-screen"}>
            <h1
              className={"text-6xl font-bold m-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"}>
              Inf Hotéis
            </h1>
            <span className={"text-2xl font-bold"}>
              Bem vindo,
              {' '}
              {meQuery.data?.username}
            </span>
          </div>
        ) : (
          <div className={"flex flex-col justify-center items-center h-screen"}>
            <h1
              className={"text-6xl font-bold m-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"}>
              Inf Hotéis
            </h1>
            <span className={"text-2xl font-bold"}>
              Faça login para continuar
            </span>
            <Link href={"/login"}>
              <Button
                type={"primary"}
              >
                Entrar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
