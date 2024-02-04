'use client';
import React from 'react';
import styles from "@styles/hotelsPage.module.css"
import {List} from 'antd';
import HotelCard from '@/components/HotelCard';
import {useQuery} from "@tanstack/react-query";
import api from "@/apiOperations/api";

interface Hotel {
  id: number;
  nome: string;
  endereco: string;
  avaliacao: number;
}

export default function Hoteis() {

  const hoteisQuery = useQuery<Hotel[]>({
    queryKey: ['hoteis'],
    queryFn: async () => {
      return api.get('api/hoteis').then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });

  const data = hoteisQuery.data ?? [];


  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.hotelsContainer}>
          <List
            grid={{
              column: 1,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3,
            }}
            pagination={{position: 'both', align: 'center', defaultPageSize: 12, pageSize: 12}}
            dataSource={data?.sort()}
            loading={hoteisQuery.isLoading}
            renderItem={(item) => (
              <List.Item>
                <HotelCard nome={item.nome} endereco={item.endereco} avaliacao={item.avaliacao} id={item.id}/>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}
