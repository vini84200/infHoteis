"use client"

import React, { useState } from 'react'
import styles from "./styles.module.css"
import {UserOutlined} from '@ant-design/icons'
import { Button, Collapse, Image, Modal, Tabs } from 'antd'
import type { TabsProps, CollapseProps } from 'antd';

type Props = {}

function ProfileInfo({}: Props) {
  return(
    <div className={styles.profileInfo}>
      <div className={styles.field}>
        <span>{'Label'}:</span>
        <div>{'Resultado'}</div>
      </div>
      <div className={styles.field}>
        <span>{'Label'}:</span>
        <div>{'Resultado'}</div>
      </div>
      <div className={styles.field}>
        <span>{'Label'}:</span>
        <div>{'Resultado'}</div>
      </div>
      <div className={styles.field}>
        <span>{'Label'}:</span>
        <div>{'Resultado'}</div>
      </div>
      <div className={styles.field}>
        <span>{'Label'}:</span>
        <div>{'Resultado'}</div>
      </div>
      <div className={styles.field}>
        <span>{'Label'}:</span>
        <div>{'Resultado'}</div>
      </div>
      <div className={styles.field}>
        <span>{'Label'}:</span>
        <div>{'Resultado'}</div>
      </div>
      <div className={styles.field}>
        <span>{'Label'}:</span>
        <div>{'Resultado'}</div>
      </div>
    </div>
  )
}

function Reservations({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'UF - Citycity da citytown - 99/99/9999 até 99/99/9999',
      children:  <div className={styles.reservation}>
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
        <div className={styles.location}>UF - Citycity da citytown</div>
        <div className={styles.date}>
          <div>99/99/9999 até 99/99/9999</div>
        </div>
        <div>não sei</div>
      </div>
      <Button type="primary" onClick={showModal}>
        + detalhes
      </Button>
    </div>,
    },
    {
      key: '2',
      label: 'UF - Citycity da citytown - 99/99/9999 até 99/99/9999',
      children:  <div className={styles.reservation}>
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
        <div className={styles.location}>UF - Citycity da citytown</div>
        <div className={styles.date}>
          <div>99/99/9999 até 99/99/9999</div>
        </div>
        <div>não sei</div>
      </div>
      <Button type="primary" onClick={showModal}>
        + detalhes
      </Button>
    </div>,
    },
    {
      key: '3',
      label: 'UF - Citycity da citytown - 99/99/9999 até 99/99/9999',
      children:  <div className={styles.reservation}>
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
        <div className={styles.location}>UF - Citycity da citytown</div>
        <div className={styles.date}>
          <div>99/99/9999 até 99/99/9999</div>
        </div>
        <div>não sei</div>
      </div>
      <Button type="primary" onClick={showModal}>
        + detalhes
      </Button>
    </div>,
    },
  ];

  return(
    <div className={styles.reservationsContainer}>
      <h2>Em andamento</h2>
      <div className={styles.reservation}>
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
          <div className={styles.location}>UF - Citycity da citytown</div>
          <div className={styles.date}>
            <div>99/99/9999 até 99/99/9999</div>
          </div>
          <div>não sei</div>
        </div>
        <Button type="primary" onClick={showModal}>
          + detalhes
        </Button>
      </div>
      <div className={styles.reservation}>
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
          <div className={styles.location}>UF - Citycity da citytown</div>
          <div className={styles.date}>
            <div>99/99/9999 até 99/99/9999</div>
          </div>
          <div>não sei</div>
        </div>
        <Button type="primary" onClick={showModal}>
          + detalhes
        </Button>
      </div>
      <h2>Já finalizadas</h2>
      <Collapse style={{width:"100%"}} items={items} />
      <Modal title="Informações da reserva" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={styles.field}>
          <span>{'Label'}:</span>
          <div>{'Resultado'}</div>
        </div>
        <div className={styles.field}>
          <span>{'Label'}:</span>
          <div>{'Resultado'}</div>
        </div>
        <div className={styles.field}>
          <span>{'Label'}:</span>
          <div>{'Resultado'}</div>
        </div>
        <div className={styles.field}>
          <span>{'Label'}:</span>
          <div>{'Resultado'}</div>
        </div>
        <div className={styles.field}>
          <span>{'Label'}:</span>
          <div>{'Resultado'}</div>
        </div>
        <div className={styles.field}>
          <span>{'Label'}:</span>
          <div>{'Resultado'}</div>
        </div>
        <div className={styles.field}>
          <span>{'Label'}:</span>
          <div>{'Resultado'}</div>
        </div>
      </Modal>
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