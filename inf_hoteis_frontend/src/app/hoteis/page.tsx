'use client';
import React, {useState} from 'react';
import styles from "@styles/hotelsPage.module.css"
import {Input, List} from 'antd';
import HotelCard from '@/components/HotelCard';
import {useQuery} from "@tanstack/react-query";
import api from "@/apiOperations/api";

import type {SearchProps} from 'antd/es/input/Search';
import {Hotel} from './[hotelId]/page';

const {Search} = Input;

export default function Hoteis() {
  const [search, setSearch] = useState<string>('');
  const hoteisQuery = useQuery<Hotel[]>({
    queryKey: ['hoteis', search],
    queryFn: async () => {
      return api.get('api/hoteis', {
        params: {
          search,
        },
      }).then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });

  const data = hoteisQuery.data ?? [];

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearch(value);
  }

  function compareHotels(a: Hotel, b: Hotel) {
    if (a.cidade < b.cidade) {
      return -1;
    } else if (a.cidade === b.cidade) {

      if (a.rua < b.rua) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <Search className={styles.searchBox} size='large' placeholder="Pesquise um estado, uma cidade, uma rua aqui..."
                allowClear={true} onSearch={onSearch} loading={hoteisQuery.isLoading && search !== ''}
                enterButton
        />
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
            dataSource={hoteisQuery.data}
            loading={{spinning: hoteisQuery.isLoading, size: 'large'}}
            // loading={hoteisQuery.isLoading}
            renderItem={(item: Hotel) => (
              <List.Item>
                <HotelCard src={item.imagem} nome={item.nome} cidade={item.cidade} estado={item.estado} rua={item.rua}
                           avaliacao={item.avaliacao} id={item.id}/>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}
