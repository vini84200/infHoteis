"use client"

import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import {CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, DollarOutlined, ExclamationCircleFilled, HistoryOutlined, UserOutlined} from '@ant-design/icons'
import { Button, Collapse, Image, Modal, Tabs } from 'antd'
import type { TabsProps, CollapseProps } from 'antd';
import getMe from "@/apiOperations/users/getMe";
import {UseQueryOptions, UseQueryResult, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {message} from 'antd';
import api from "@/apiOperations/api";
import Search from 'antd/es/input/Search'
import { SearchProps } from 'antd/lib/input'

type Props = {}

function ProfileInfo({}: Props) {
  const me = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      return getMe()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  console.log(me)

  return(
    <div className={styles.profileInfo}>
      <div className={styles.field}>
        <span>Nome de usuário:</span>
        <div>{me.data?.username}</div>
      </div>
    </div>
  )
}

const { confirm } = Modal;

function Reservations({}: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  const reservationQuery = useQuery<[]>({
    queryKey: ['reservas'],
    queryFn: async () => {
      return api.get('api/reservas').then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });

  
  var reservas = reservationQuery?.data ?? [];

  const [filterData, setFilterData] = useState(reservas)

  const showCancel = (id) => {
    confirm({
      title: 'Tem certeza que deseja cancelar a reserva?',
      centered: true,
      icon: <ExclamationCircleFilled style={{color:'var(--red)'}}/>,
      onOk() {
        api.delete(`api/reservas/${id}`).then((res) => res.data).then((e) => {
          reservationQuery.refetch()
          messageApi.open({
            type: 'success',
            content: "Reserva cancelada com sucesso!",
          });
        }
        ).catch((e)=>{
          messageApi.open({
            type: 'error',
            content: e.response.data.detail,
          });
        })
      },
    });
  };

  const onSearch: SearchProps['onSearch'] = (value) => {
    console.log(reservas)
    setFilterData(reservas.filter(el => {
      return(
        el.data_inicio.toLowerCase().includes(value.toLowerCase()) ||
        el.data_fim.toLowerCase().includes(value.toLowerCase())
      )
    }))
  }

  return(
    <div className={styles.reservationsContainer}>
      {contextHolder}
      <Search className={styles.searchBox} size='large' placeholder="Pesquise um estado, uma cidade, uma rua aqui..." allowClear={true} onSearch={onSearch}/>
      <h2>Em andamento</h2>
      {filterData.map((item, i)=>{
        return(
          !item.cancelada &&
          <div key={i} className={styles.reservation}>
            <div className={styles.hotelImage}>
              <Image
                alt="Imagem do hotel"
                width={'100%'}
                height={'100%'}
                className={styles.image}
                src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
              /> 
            </div>
            <div className={styles.reservationInfo}>
              <div className={styles.location}>ID reserva: {item.id}</div>
              <div className={styles.date}>
                <div>{new Date(item.data_inicio).toLocaleDateString()} até {new Date(item.data_fim).toLocaleDateString()}</div>
              </div>
              <div className={styles.statusContainer}>
                {!item.pago && <div><HistoryOutlined style={{color: "gray"}} className={styles.statusIcon}/> aguardando pagamento...</div>}
                {item.pago && <div><DollarOutlined style={{color: "green"}} className={styles.statusIcon}/> pago</div>}
                {item.checkin && <div><CheckCircleOutlined style={{color: "blue"}} className={styles.statusIcon}/> checkin</div>}
                {item.checkout && <div><CheckCircleFilled style={{color: "blue"}} className={styles.statusIcon}/> checkout</div>}
              </div>
            </div>
            <Button type="primary" onClick={() => {showCancel(item.id)}}>cancelar</Button>
          </div>
        )
      })}
    </div>
  )
}

function SpaceReservations({}: Props) {
  return(
    <div className={styles.spacesContainer}>
      reservar espaços
    </div>
  )
}

export default function Perfil({}: Props) {
  const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Meu perfil',
      children: <ProfileInfo/>,
    },
    {
      key: '2',
      label: 'Minhas reservas',
      children: <Reservations/>,
    },
    {
      key: '3',
      label: 'Reservar espaço',
      children: <SpaceReservations/>,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.bgImage}></div>
      <div className={styles.profileContainer}>
        <header className={styles.header}>
          <div className={styles.profileImage}>
            <UserOutlined style={{fontSize: '5rem', color: 'black'}}/>
          </div>
        </header>
        <main className={styles.content}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </main>
      </div>
    </div>
  )
}