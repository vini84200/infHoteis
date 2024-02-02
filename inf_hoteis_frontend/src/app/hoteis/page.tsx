'use client';
import React, { useState } from 'react';
import styles from "@styles/hotelsPage.module.css"
import Sider from 'antd/lib/layout/Sider';
import { List, Pagination, type SelectProps } from 'antd';
import HotelCard from '@/components/HotelCard';


export default function Hoteis() {
  var data = [
    {
      id: 1,
      city: "RS - Gravataí",
      street: "Rua Castilho Inácio Barcelos",
      rate: 4
    },
    {
      id: 2,
      city: "SP - São Paulo",
      street: "Avenida Paulista",
      rate: 3
    },
    {
      id: 3,
      city: "RJ - Rio de Janeiro",
      street: "Copacabana",
      rate: 5
    },
    {
      id: 4,
      city: "MG - Belo Horizonte",
      street: "Rua da Bahia",
      rate: 4.5
    },
    {
      id: 5,
      city: "SC - Florianópolis",
      street: "Avenida Beira-Mar",
      rate: 4
    },
    {
      id: 6,
      city: "PR - Curitiba",
      street: "Rua XV de Novembro",
      rate: 4
    },
    {
      id: 7,
      city: "BA - Salvador",
      street: "Pelourinho",
      rate: 4
    },
    {
      id: 8,
      city: "PE - Recife",
      street: "Boa Viagem",
      rate: 5
    },
    {
      id: 9,
      city: "DF - Brasília",
      street: "Esplanada dos Ministérios",
      rate: 4
    },
    {
      id: 10,
      city: "AM - Manaus",
      street: "Avenida das Torres",
      rate: 4.5
    },
    {
      id: 11,
      city: "ES - Vitória",
      street: "Praia do Canto",
      rate: 3.5
    },
    {
      id: 12,
      city: "GO - Goiânia",
      street: "Rua 83",
      rate: 4.5
    },
    {
      id: 13,
      city: "GO - Goiânia",
      street: "Rua 84",
      rate: 4.5
    }
  ];

  data.sort(function(a, b){
      return a.city.localeCompare(b.city) || a.street.localeCompare(b.street);
  });
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
          pagination={{ position:'both', align:'center', defaultPageSize:12, pageSize:12}}
          dataSource={data.sort()}
          renderItem={(item) => (
            <List.Item>
              <HotelCard city={item.city} street={item.street} rate={item.rate}/>
            </List.Item>
          )}
        />
        </div>
      </div>
    </div>
  );
}
