'use client';
import React from 'react';
//import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {Button, Col, Form, Image, Input, Row, Space,} from 'antd';
import {CalendarOutlined, ClockCircleOutlined, UserOutlined} from '@ant-design/icons';
import styles from "./styles.module.css";

interface ReservaDetails {
  quartos: {
    quantidade: number;
    id: number;
    categoria: {
      id: number;
      nome: string;
    }
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

export default function ReservaModal(props: { reserva: ReservaDetails }) {
  const {reserva} = props;
  const price = reserva.preco;
  const pessoas = 4;
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

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (

    <div className={styles.container}>

      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
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


                <Form.Item
                  name={['user', 'first_name']}
                  label="Nome"
                  rules={[
                    {required: true, message: 'Nome é obrigatório!'},
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: 'Nome deve conter apenas letras!',
                    },
                  ]}
                >
                  <div className={styles.inputContainer}>
                    <Input
                      placeholder="Jane"
                      variant="filled"
                      className={styles.inputStyle}
                    />
                  </div>
                </Form.Item>


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
