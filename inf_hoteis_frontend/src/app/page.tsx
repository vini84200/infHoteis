'use client';
import React, { useState } from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import getMe from "@/apiOperations/users/getMe";
import {Button, InputNumber, Spin} from "antd";
import Link from "next/link";
import styles from "@styles/home.module.css";

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

import { Select } from 'antd';

async function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
}

export default function Home() {
  const [value, setValue] = useState<string | number | null>('99');

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

  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
            <div className={styles.name}>Cidade</div>
            <Select
              style={{width: '100%'}}
              showSearch
              placeholder="Selecione uma cidade"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
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
            />
          </div>
          <div className={styles.field}>
            <div className={styles.name}>N° de hospedes</div>
            <div className={styles.input}><InputNumber style={{width: '100%'}} min={1} max={6} value={value} onChange={setValue} /></div>
          </div>
          <div className={styles.field}>
            <div className={styles.name}>Tipo de quarto</div>
            <Select
              style={{width: '100%'}}
              showSearch
              placeholder="Selecione um tipo de quarto"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
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
            />
          </div>
          <div className={styles.field}>
            <div className={styles.name}>Data da viagem</div>
            <div className={styles.input}>
            <RangePicker style={{width: '100%'}} format={"DD/MM/YYYY"}/>
            </div>
          </div>
          <button className={styles.button}>
            Pesquisar
          </button>
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
