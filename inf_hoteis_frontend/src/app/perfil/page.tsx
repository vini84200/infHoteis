"use client"

import React, {useMemo, useState} from 'react'
import {Hotel, EspacoHotel} from '../hoteis/[hotelId]/page';

import styles from "./styles.module.css"
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DollarOutlined,
  ExclamationCircleFilled,
  HistoryOutlined,
  UserOutlined
} from '@ant-design/icons'
import type {TabsProps} from 'antd';
import {Button, DatePicker, Form, Image, message, Modal, Select, Tabs} from 'antd'
import getMe from "@/apiOperations/users/getMe";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import api from "@/apiOperations/api";
import Search from 'antd/es/input/Search'
import {SearchProps} from 'antd/lib/input'

const { RangePicker } = DatePicker;
const { Option } = Select;

type Props = {}

function ProfileInfo({}: Props) {
  const me = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      return getMe()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  const perfilQuery = useQuery({
    queryKey: ['perfil'],
    queryFn: async () => {
      return api.get('api/perfil').then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (me.isLoading || perfilQuery.isLoading) {
    return <div>Carregando...</div>
  }
  if (me.isError || perfilQuery.isError) {
    return <div>Erro ao carregar informações do usuário</div>
  }
  if (!me.data?.logged_in) {
    return <div>Você precisa estar logado para ver as informações do seu perfil</div>
  }

  return (
    <div className={styles.profileInfo}>
      <div className={styles.field}>
        <span>Nome de usuário:</span>
        <div>{me.data?.username}</div>
      </div>
      <div className={styles.field}>
        <span>Nome:</span>
        <div>{perfilQuery.data!.first_name} {perfilQuery.data!.last_name}</div>
      </div>
      <div className={styles.field}>
        <span>Email:</span>
        <div>{me.data?.email}</div>
      </div>
    </div>
  )
}

const {confirm} = Modal;

interface Reserva {
  id: number;
  quarto: {
    numero: number;
    categoria: {
      nome: string;
      descricao: string;
      beneficios: {
        nome: string;
      }[];
      preco: number;
      hospedes: number;
      imagem: string;
    };
    hotel: number;
  },
  data_inicio: string;
  data_fim: string;
  pago: boolean;
  checkin: boolean;
  checkout: boolean;
  cancelada: boolean;
  preco: number;
  hotel: {
    nome: string;
    descricao: string;
    estado: string;
    cidade: string;
    rua: string;
    imagem: string;
  };

}

function Reservations({}: Props) {
  const [search, setSearch] = React.useState<string>('')
  const [messageApi, contextHolder] = message.useMessage();
  const reservationQuery = useQuery<Reserva[]>({
    queryKey: ['reservas', search],
    queryFn: async () => {
      return api.get('api/reservas',
        {
          params: {
            search: search
          }
        }).then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });
  const queryClient = useQueryClient();
  const cancelReservationMutation = useMutation({
    mutationKey: ['cancelarReserva'],
    mutationFn: async (id: number) => {
      return api.delete(`api/reservas/${id}`)
        .then((res) => res.data)
        .catch((e) => {
          if (e.response.status === 400) {
            throw new Error(e.response.data.detail)
          }
          if (e.response.status === 401) {
            throw new Error('Você precisa estar logado para cancelar uma reserva')
          }
        })
    },
    onError: (e) => {
      messageApi.open({
        type: 'error',
        content: e.message,
      });
    },

    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: "Reserva cancelada com sucesso!",
      });
      queryClient.invalidateQueries({
        queryKey: ['reservas'],
      })
    }
  })


  var reservas = reservationQuery?.data ?? [];



  const showCancel = (id: number) => {
    confirm({
      title: 'Tem certeza que deseja cancelar a reserva?',
      centered: true,
      icon: <ExclamationCircleFilled style={{color: 'var(--red)'}}/>,
      onOk() {
        cancelReservationMutation.mutate(id)
      },
    });
  };

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearch(value)
  }

  const filterData = useMemo(() => {
    return reservas.filter((item) => {
      return !item.cancelada
    })
  }, [reservas])

  return (
    <div className={styles.reservationsContainer}>
      {contextHolder}
      <Search className={styles.searchBox} size='large' placeholder="Pesquise um estado, uma cidade, uma rua aqui..."
              allowClear={true} onSearch={onSearch} loading={reservationQuery.isLoading && search !== ''}
              enterButton/>
      <h2>Em andamento</h2>
      {filterData.map((item, i) => {
        return (
          !item.cancelada &&
          <div key={i} className={styles.reservation}>
            <div className={styles.hotelImage}>
              <Image
                alt="Imagem do hotel"
                width={'100%'}
                height={'100%'}
                className={styles.image}
                src={item.quarto.categoria.imagem}
              />
            </div>
            <div className={styles.reservationInfo}>
              <div className={styles.location}>
                <div><strong>Hotel</strong></div>
                <div>{item.hotel.nome}</div>
                <div>{item.hotel.cidade}, {item.hotel.estado}</div>
                <div>{item.hotel.rua}</div>
                <div><strong>Quarto </strong> {item.quarto.numero} - {item.quarto.categoria.nome}</div>
              </div>
              <div className={styles.date}>
                <div>{new Date(item.data_inicio).toLocaleDateString('pt-br', {timeZone: "UTC"})} até {new Date(item.data_fim).toLocaleDateString('pt-br', {
                  timeZone: "UTC"
                })}</div>
              </div>
              <div className={styles.price}>
                <div>R$ {item.preco}</div>
              </div>
              <div className={styles.statusContainer}>
                {!item.pago &&
                  <div><HistoryOutlined style={{color: "gray"}} className={styles.statusIcon}/> aguardando pagamento...
                  </div>}
                {item.pago && <div><DollarOutlined style={{color: "green"}} className={styles.statusIcon}/> pago</div>}
                {item.checkin &&
                  <div><CheckCircleOutlined style={{color: "blue"}} className={styles.statusIcon}/> checkin</div>}
                {item.checkout &&
                  <div><CheckCircleFilled style={{color: "blue"}} className={styles.statusIcon}/> checkout</div>}
              </div>
            </div>
            <Button type="primary" onClick={() => {
              showCancel(item.id)
            }}>cancelar</Button>
          </div>
        )
      })}
    </div>
  )
}

function SpaceReservations({}: Props) {

  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
  };
  const [form] = Form.useForm();
  const hotel = Form.useWatch('hotel', form);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fazerReservaEspaco = useMutation({
    mutationKey: ['espaco'],
    mutationFn: (data: {idEspaco: number, data_inicio: string, data_fim: string}) => {
      return api.post(`api/espacoReservas/`, data).then((res) => res.data).catch(
        (e) => {
          // If the error is a 400, it means that the reservation is not possible
          if (e.response.status === 400) {
            if (e.response.data.non_field_errors) {
              return Promise.reject(e.response.data.non_field_errors.join(", "))
            }
            return Promise.reject(e.response.data)
          }
        }
      )
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ['reservas']
      // })
      // messageApi.success("Reserva realizada com sucesso").then()
      // router.push('/perfil')
      setIsModalOpen(true);
    },
    onError: (e) => {
      // Set an error message in the form
      form.setFields([
        {
          name: "date",
          errors: [e.toString()]
        }
      ])
      // messageApi.error(`Erro ao realizar reserva: ${e}`).then()
    }
  })

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const hoteisQuery = useQuery<Hotel[]>({
    queryKey: ['hoteis'],
    queryFn: async () => {
      return api.get('api/hoteis').then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });

  const espacosQuery = useQuery<EspacoHotel[]>({
    queryKey: ['espacoHotel', hotel],
    queryFn: async () => {
      return api.get('api/espacoshotel/' + hotel).then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });



  return(

    <div className={styles.spacesContainer}>
      <div className={styles.reservarEspaco}>
      <Form form={form} onFinish={(a) => {
              console.log(a)
              const data = {
                idEspaco: a.espaco, 
                data_inicio: a.date[0].toISOString().slice(0,19),
                data_fim: a.date[1].toISOString().slice(0,19)
              }
              fazerReservaEspaco.mutate(data)
              }}>
      <Form.Item 
        name="hotel"
        label="Selecione o Hotel"
        rules={[{ required: true, message: 'Hotel é obrigatório!' }]}
      >
        <Select placeholder="Hotel">
          {hoteisQuery.data?.map((item) => (<Option value={item.id}>{item.nome}</Option>))}
        </Select>
      </Form.Item>

      <Form.Item
        name="espaco"
        label="Selecione o espaço"
        rules={[{ required: true, message: 'Espaço é obrigatório!' }]}
      >
        <Select placeholder="Espaço">
          {espacosQuery.data?.map((item) => (<Option value={item.id}>{item.nome}</Option>))}
        </Select>
      </Form.Item>

      <Form.Item name="date" label="Selecione data e horário" {...rangeConfig}>
        <RangePicker showTime format="DD-MM-YYYY HH:mm:ss" />
      </Form.Item>

      <Form.Item >

      <Button type="primary" htmlType="submit">
        Fazer reserva
      </Button>
      <Modal title="Reserva enviada para aprovação"
              open={isModalOpen}
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

  // const searchParams = new URLSearchParams(window.loc

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
          <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
        </main>
      </div>
    </div>
  )
}
