"use client"

import React, { useState } from 'react'
import styles from "./styles.module.css"
import {UserOutlined} from '@ant-design/icons'
import { Button, Collapse, Image, Modal, Tabs, Form, Input, Select, DatePicker } from 'antd'
import { FormInstance } from 'antd/lib/form';
import type { TabsProps, CollapseProps } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
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
  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
  };
  const [form] = Form.useForm();
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
  
  return(
    <div className={styles.spacesContainer}>
      <div className={styles.reservarEspaco}>
      <Form>
      <Form.Item
        name="hotel"
        label="Selecione o Hotel"
        rules={[{ required: true, message: 'Hotel é obrigatório!' }]}
      >
        <Select placeholder="Hotel">
          <Option value="doVale">Hotel do vale</Option>
          <Option value="doCentro">Hotel do centro</Option>
          <Option value="daSaude">Hotel da saúde</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="espaco"
        label="Selecione o espaço"
        rules={[{ required: true, message: 'Espaço é obrigatório!' }]}
      >
        <Select placeholder="Espaço">
          <Option value="festa">Salão de festas</Option>
          <Option value="jogos">Salão de jogos</Option>
          <Option value="teatro">Teatro</Option>
          <Option value="piscina">Piscina</Option>
        </Select>
      </Form.Item>

      <Form.Item name="range-time-picker" label="Selecione data e horário" {...rangeConfig}>
        <RangePicker showTime format="DD-MM-YYYY HH:mm:ss" />
      </Form.Item>

      <Form.Item >

      <Button type="primary" onClick={showModal}>
        Fazer reserva
      </Button>
      <Modal title="Reserva enviada para aprovação"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}>
        <p>Você receberá um email de confirmação em até 24 horas</p>
      </Modal>
    </Form.Item>
    </Form>


      </div>
      
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