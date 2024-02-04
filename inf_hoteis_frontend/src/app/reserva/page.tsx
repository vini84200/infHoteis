'use client';
import React, { useState } from 'react';
//import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Dropdown, Space, Input, Flex, Divider, Col, Row, Form, Slider, Image, } from 'antd';
import { WifiOutlined, CoffeeOutlined, CarOutlined, ClockCircleOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import styles from "./styles.module.css";


export default function Reserva() {
      const price = 1300.00;
      const pessoas = 4;
      const dataInicio = "16 de janeiro";
      const dataFim = "24 de janeiro";

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
        <Row>
            <Col span={12}>
                <div className={styles.columns}>
                    <p style={{fontSize: '40px'}}>Faça sua reserva!</p>
                    <div className={styles.passos}>
                        <p style={{fontSize: '30px'}}>Passo 1: Dados pessoais</p>
                        
        
                        <Form.Item 
                            name={['user', 'name']} 
                            label="Nome" 
                            rules={[
                                { required: true, message: 'Nome é obrigatório!' },
                                {
                                pattern: /^[A-Za-z\s]+$/,
                                message: 'Nome deve conter apenas letras!',
                                },
                            ]}
                            >
                            <div className={styles.inputContainer}>
                                <Input 
                                    placeholder="Jane Doe"
                                    variant="filled"
                                    className={styles.inputStyle}
                                />
                            </div>
                        </Form.Item>

                    
                        <Form.Item 
                            name={['user', 'cpf']} 
                            label="CPF" 
                            rules={[
                                { required: true, message: 'CPF é obrigatório!' },
                                {
                                pattern: /^[0-9]{11}$/,
                                message: 'CPF deve conter exatamente 11 dígitos numéricos!',
                                },
                            ]}>
                            <Input 
                                placeholder="123.456.789-10"
                                variant="filled"
                                className={styles.inputStyle}
                            />
                        </Form.Item>
                        
                        <Form.Item 
                            name={['user', 'email']} 
                            label="Email" 
                            rules={[{ type: 'email', required: true}]}>
                            <Input
                                placeholder="exemplo@email.com"
                                variant="filled"
                                className={styles.inputStyle}
                            />
                        </Form.Item>

                        <Form.Item 
                        name={['user', 'cel']}
                        label="Telefone"
                        rules={[
                          { required: true, message: 'Telefone é obrigatório!' },
                          {
                            pattern: /^[0-9\s]+$/,
                            message: 'Telefone deve conter apenas números!',
                          },
                        ]}
                      >
                            <Input
                            placeholder="99 99999-9999"
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
                                    { required: true, message: 'Nome no Cartão é obrigatório!' },
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
                                    { required: true, message: 'Número do cartão é obrigatório!' },
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
                                            { required: true, message: 'Data de validade é obrigatória!' },
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
                                            { required: true, message: 'CVV é obrigatório!' },
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
                    </div>
                </div>
            </Col>

            <Col span={12}>
                <div className={styles.columns}>
                    <div className={styles.infoHotel}>
                        <div className={styles.borda}>
                            <div className={styles.imagem}>
                                <Image
                                    alt="Imagem do hotel"
                                    src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
                                />
                            </div>
                            <div className={styles.infos}>
                                <div className={styles.linha}>
                                    <Space>
                                        <WifiOutlined />
                                        <p>Wifi</p>
                                        <CoffeeOutlined />
                                        <p>Café da manhã</p>
                                        <CarOutlined />
                                        <p>Estacionamento</p>
                                    </Space>
                                </div>
                                <div className={styles.linha}>
                                    <Space>
                                        <ClockCircleOutlined />
                                        <p>Check-in: 14:00</p>
                                    </Space>
                                    <Space>
                                        <ClockCircleOutlined />
                                        <p>Check-out: 10:00</p>
                                    </Space>
                                </div>
                                <div className={styles.linha}>
                                    <Space>
                                        <UserOutlined />
                                        <p>{pessoas} pessoas</p>
                                    </Space>
                                </div>
                                <div className={styles.linha}>
                                    <Space>
                                        <CalendarOutlined />
                                        <p>De {dataInicio} até {dataFim}</p>
                                    </Space>
                                </div>
                            </div>
                            <h1>R$ {price.toFixed(2)}</h1>
                        </div>
                    </div>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.botao}>
                        Fazer reserva
                    </Button>
                    </Form.Item>
                    
                </div>
            </Col>
          </Row>
          </Form>
        
      </div>
  );
}