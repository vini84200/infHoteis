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
        <Link href="/hoteis" className={styles.button}>
          Pesquisar hotéis
        </Link>
      </div>
    </div>
  )
}
