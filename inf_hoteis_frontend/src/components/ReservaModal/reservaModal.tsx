'use client';
import React, {useEffect} from 'react';
//import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {Button, Col, Form, Image, Input, message, Row, Space,} from 'antd';
import {CalendarOutlined, ClockCircleOutlined, UserOutlined} from '@ant-design/icons';
import styles from "./styles.module.css";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "@/apiOperations/api";
import {useRouter} from "next/navigation";

interface ReservaDetails {
  quartos: {
    quantidade: number;
    id: number;
  }[]
  dataInicio: string,
  dataFim: string,
  hotel: {
    id: number,
    nome: string,
    cidade: string,
    estado: string,
    imagem: string,
  },
  preco: number

}

interface Reserva {
  user: {
    first_name: string,
    last_name: string,
    email: string,
    nomeCartao: string,
    numeroCartao: string,
    data: string,
    cvv: string
  }
}

export default function ReservaModal(props: { reserva: ReservaDetails }) {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const perfilQuery = useQuery({
    queryKey: ['perfil'],
    queryFn: async () => {
      return api.get('api/perfil').then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });
  const [form] = Form.useForm<Reserva>();
  const {reserva} = props;
  const price = reserva.preco;
  const dataInicio = new Date(reserva.dataInicio).toLocaleDateString("pt-BR", {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  });
  const dataFim = new Date(reserva.dataFim).toLocaleDateString("pt-BR", {
    day: 'numeric',
    month: 'long',
    timeZone: "UTC"
  });

  const router = useRouter();

  const reservaMutation = useMutation({
    mutationKey: ['reserva', reserva.hotel.id],
    mutationFn: (data: { tipo: { id: number, quantidade: number }[], data: { inicio: string, fim: string } }) => {
      const r = {
        hotel: Number(reserva.hotel.id),
        reserva: data.tipo.map((t) => ({
          qtde: t.quantidade,
          tipo: t.id
        })).filter((t) => t.qtde > 0),
        data_inicio: data.data.inicio,
        data_fim: data.data.fim
      }
      return api.post(`api/reservas/`, r).then((res) => res.data).catch(
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
      queryClient.invalidateQueries({
        queryKey: ['reservas']
      })
      messageApi.success("Reserva realizada com sucesso").then()
      router.push('/perfil')

    },
    onError: (e) => {
      // Set an error message in the form
      form.setFields([
        {
          name: "date",
          errors: [e.toString()]
        }
      ])
      messageApi.error(`Erro ao realizar reserva: ${e}`).then()
    }
  })

  const sendPerfil = useMutation({
    mutationKey: ['perfil'],
    mutationFn: (data: { first_name: string, last_name: string, email: string }) => {
      return api.put('api/perfil/', data).then((res) => res.data)
    },
    onSuccess: () => {
      messageApi.success("Perfil atualizado com sucesso").then()
      reservaMutation.mutate({
        tipo: reserva.quartos.map((t) => ({id: t.id, quantidade: t.quantidade})),
        data: {inicio: reserva.dataInicio, fim: reserva.dataFim}
      })
    },
    onError: (e) => {
      messageApi.error(`Erro ao atualizar perfil: ${e}`).then()
    }
  });
  useEffect(() => {
    if (perfilQuery.status === 'success') {
      console.log(perfilQuery.data)
      console.log(form.getFieldValue('user'))
      form.setFieldsValue({
        user: {
          first_name: perfilQuery.data.first_name,
          last_name: perfilQuery.data.last_name,
          email: perfilQuery.data.email,
        }
      });

    }
  }, [perfilQuery.data, perfilQuery.status]);


  const validateMessages = {
    required: '${label} é obrigatório!',
    types: {
      email: '${label} não é um email válido!',
      number: 'Não é um número válido!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: Reserva) => {
    sendPerfil.mutate({
      first_name: values.user.first_name,
      last_name: values.user.last_name,
      email: values.user.email,
    })
    console.log(values);
  };

  return (

    <div className={styles.container}>

      {contextHolder}
      <Form<Reserva>
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        {/*<pre>*/}
        {/*  {JSON.stringify(reserva, null, 2)}*/}
        {/*</pre>*/}
        <Row>
          <Col span={24}>
            <div className={styles.columns}>
              <p style={{fontSize: '40px'}}>Faça sua reserva!</p>
              <div className={styles.infoHotel}>
                <div className={styles.borda}>
                  <div className={styles.imagem}>
                    <Image
                      alt="Imagem do hotel"
                      src={reserva.hotel.imagem}
                    />
                  </div>
                  <div className={styles.infos}>
                    {/*<div className={styles.linha}>*/}
                    {/*  <Space>*/}
                    {/*    <WifiOutlined/>*/}
                    {/*    <p>Wifi</p>*/}
                    {/*    <CoffeeOutlined/>*/}
                    {/*    <p>Café da manhã</p>*/}
                    {/*    <CarOutlined/>*/}
                    {/*    <p>Estacionamento</p>*/}
                    {/*  </Space>*/}
                    {/*</div>*/}
                    <div className={styles.linha}>
                      <Space>
                        <ClockCircleOutlined/>
                        <p>Check-in: 14:00</p>
                      </Space>
                      <Space>
                        <ClockCircleOutlined/>
                        <p>Check-out: 10:00</p>
                      </Space>
                    </div>
                    <div className={styles.linha}>
                      <Space>
                        <UserOutlined/>
                        <p>{reserva.quartos.reduce((acc, t) => (t.quantidade ? acc + t.quantidade : acc), 0)} quartos</p>
                      </Space>
                    </div>
                    <div className={styles.linha}>
                      <Space>
                        <CalendarOutlined/>
                        <p>De {dataInicio} até {dataFim}</p>
                      </Space>
                    </div>
                  </div>
                  <h1>R$ {price.toFixed(2)}</h1>
                </div>
              </div>

            </div>
          </Col>
          <Col span={24}>
            <div className={styles.columns}>
              <div className={styles.passos}>
                <p style={{fontSize: '30px'}}>Passo 1: Dados pessoais</p>


                <div className={styles.inputContainer}>
                  <Form.Item
                    name={['user', 'first_name']}
                    label="Nome"
                    rules={[
                      {required: true, message: 'Nome é obrigatório!'},
                    ]}
                  >
                    <Input
                      placeholder="Jane"
                      variant="filled"
                      className={styles.inputStyle}
                    />
                  </Form.Item>
                </div>


                <Form.Item
                  name={['user', 'last_name']}
                  label="Sobrenome"
                  rules={[
                    {required: true, message: 'Sobrenome é obrigatório!'},
                  ]}>
                  <Input
                    placeholder="Doe"
                    variant="filled"
                    className={styles.inputStyle}
                  />
                </Form.Item>

                <Form.Item
                  name={['user', 'email']}
                  label="Email"
                  rules={[{type: 'email', required: true}]}>
                  <Input
                    placeholder="exemplo@email.com"
                    variant="filled"
                    className={styles.inputStyle}
                  />
                </Form.Item>

              </div>
              <div className={styles.passos}>
                <p style={{fontSize: '30px'}}>Passo 2: Pagamento</p>

                <Form.Item
                  name={['user', 'nomeCartao']}
                  label="Nome no Cartão"
                  rules={[
                    {required: true, message: 'Nome no Cartão é obrigatório!'},
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: 'Nome no Cartão deve conter apenas letras!',
                    },
                  ]}
                >
                  <Input
                    placeholder="JANE DOE"
                    variant="filled"
                    className={styles.inputStyle}
                  />
                </Form.Item>

                <Form.Item
                  name={['user', 'numeroCartao']}
                  label="Número do cartão"
                  rules={[
                    {required: true, message: 'Número do cartão é obrigatório!'},
                    {
                      pattern: /^[0-9]{13,16}$/,
                      message: 'Número inválido!',
                    },
                  ]}
                >
                  <Input
                    placeholder="9999 9999 9999 9999"
                    variant="filled"
                    className={styles.inputStyle}
                  />
                </Form.Item>
                <Space>
                  <div>

                    <Form.Item
                      name={['user', 'data']}
                      label="Validade"
                      rules={[
                        {required: true, message: 'Data de validade é obrigatória!'},
                        {
                          pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: 'Formato de data inválido. Use MM/AA!',
                        },
                      ]}>
                      <Input
                        placeholder="11/11"
                        variant="filled"
                        className={styles.inputStyle}
                      />
                    </Form.Item>
                  </div>
                  <div>

                    <Form.Item
                      name={['user', 'cvv']}
                      label="CVV"
                      rules={[
                        {required: true, message: 'CVV é obrigatório!'},
                        {
                          pattern: /^[0-9]{3}$/,
                          message: 'CVV inválido!',
                        },
                      ]}>
                      <Input
                        placeholder="999"
                        variant="filled"
                        className={styles.inputStyle}
                      />
                    </Form.Item>
                  </div>
                </Space>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className={styles.botao}>
                    Fazer reserva
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
      </Form>

    </div>
  );
}
