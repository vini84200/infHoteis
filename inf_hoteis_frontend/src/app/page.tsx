'use client';
import React, { useState } from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import getMe from "@/apiOperations/users/getMe";
import {Button, InputNumber, Spin} from "antd";
import Link from "next/link";
import styles from "@styles/home.module.css";

import { List, NumberInput, PeriodoDatas } from '@/components/Inputs';

async function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
}

export default function Home() {
  const [value, setValue] = useState<string | number | null>('1');

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
  })
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        type: 'all'
      })
    }
  })
  if (meQuery.isPending) {
    return <Spin fullscreen delay={200}/>
  }
  if (meQuery.isError) {
    return (
      <div>Erro</div>)
  }
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return(
    <div className={styles.container}>
      <div className={styles.entryBanner}>
        <div className={styles.mask}></div>
        <div className={styles.title}>
         onde o conforto encontra a excelência.
        </div>
        {/* transformar em form dps */}
        <div className={styles.findHotelContainer}>
          <div className={styles.field}>
            <List label={"Localização"} 
            options={[
              {
                value: 'rs-gravatai',
                label: 'RS - Gravataí',
              },
              {
                value: 'rs-portoalegre',
                label: 'RS - Porto Alegre',
              },
              {
                value: 'rs-cachoeirinha',
                label: 'RS - Cachoeirinha',
              },
            ]} 
            onChange={onChange} onSearch={onSearch}/>
          </div>
          <div className={styles.field}>
            <NumberInput label={"Número de quartos"} value={value} setValue={setValue}/>
          </div>
          <div className={styles.field}>
          <List label={"Tipo de quarto"} 
            options={[
              {
                value: 'familia-premium',
                label: 'Familia Premium',
              },
              {
                value: 'familia',
                label: 'Familia',
              },
              {
                value: 'solteiro',
                label: 'Solteiro',
              },
            ]} 
            onChange={onChange} onSearch={onSearch}/>
          </div>
          <div className={styles.field}>
            <PeriodoDatas />
          </div>
          <Link href="/hoteis" className={styles.button}>
            Pesquisar
          </Link>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className={"h-screen"}>
  //     <div className={"flex flex-col justify-center items-center h-screen"}>
  //       {meQuery.data?.logged_in ? (
  //         <div className={"flex flex-col justify-center items-center h-screen"}>
  //           <h1
  //             className={"text-6xl font-bold m-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"}>
  //             Inf Hotéis
  //           </h1>
  //           <span className={"text-2xl font-bold"}>
  //             Bem vindo,
  //             {' '}
  //             {meQuery.data?.username}
  //           </span>
  //           <Button type={"link"} onClick={() => logoutMutation.mutate()}>
  //             Sair
  //           </Button>
  //         </div>
  //       ) : (
  //         <div className={"flex flex-col justify-center items-center h-screen"}>
  //           <h1
  //             className={"text-6xl font-bold m-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"}>
  //             Inf Hotéis
  //           </h1>
  //           <span className={"text-2xl font-bold"}>
  //             Faça login para continuar
  //           </span>
  //           <Link href={"/login"}>
  //             <Button
  //               type={"primary"}
  //             >
  //               Entrar
  //             </Button>
  //           </Link>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
}
