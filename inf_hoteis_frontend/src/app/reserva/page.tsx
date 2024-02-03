'use client';
import React, { useState } from 'react';
import { Button, Dropdown, Space, Input, Flex, Divider, Col, Row, Form, Slider, Image } from 'antd';
import { WifiOutlined, CoffeeOutlined, CarOutlined, ClockCircleOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import styles from "./styles.module.css";


export default function Hoteis() {
  const [reservationData, setReservationData] = useState({
    // Adicione estados para armazenar os dados do formulário
    fullName: "",
    cpf: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
  });

  const handleInputChange = (field: keyof typeof reservationData, value: string) => {
    setReservationData({
      ...reservationData,
      [field]: value,
    });
  };

  const handleReserveClick = () => {
    // Adicione a lógica para enviar a reserva
    console.log("Reserva enviada:", reservationData);
  };

  
  return (
    
    <div className={styles.container}>
        <Row>
            <Col span={12}>
                <div className={styles.columns}>
                    <p style={{fontSize: '40px'}}>Faça sua reserva!</p>
                    <div className={styles.passos}>
                        <p style={{fontSize: '30px'}}>Passo 1: Dados pessoais</p>
              
                        <p>Nome completo:</p>
                        <Input
                        placeholder="Jane Doe"
                        variant="filled"
                        className={styles.inputStyle}
                        value={reservationData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />

                        <p>CPF:</p>
                        <Input
                        placeholder="123.456.789-10"
                        variant="filled"
                        className={styles.inputStyle}
                        value={reservationData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        />

                        <p>Email:</p>
                        <Input
                        placeholder="exemplo@email.com"
                        variant="filled"
                        className={styles.inputStyle}
                        value={reservationData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        />

                        <p>Telefone:</p>
                        <Input
                        placeholder="99 99999-9999"
                        variant="filled"
                        className={styles.inputStyle}
                        value={reservationData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                    </div>
                    <div className={styles.passos}>
                        <p style={{fontSize: '30px'}}>Passo 2: Pagamento</p>
                            <p >Nome no cartão:</p>
                            <Input placeholder="JANE DOE" variant="filled" className={styles.inputStyle}/>
                            <p >Numero do cartão</p>
                            <Input placeholder="9999 9999 9999 9999" variant="filled" className={styles.inputStyle}/>
                            <Space>
                                <div>
                                    <p >Data de Validade:</p>
                                    <Input placeholder="11/11" variant="filled" className={styles.inputStyle}/>
                                </div>
                                <div>
                                    <p >Código de segurança:</p>
                                    <Input placeholder="999" variant="filled" className={styles.inputStyle}/>
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
                                        <p>2 pessoas</p>
                                    </Space>
                                </div>
                                <div className={styles.linha}>
                                    <Space>
                                        <CalendarOutlined />
                                        <p>De 16 de janeiro até 25 de janeiro</p>
                                    </Space>
                                </div>
                            </div>
                            <h1>R$ 1.200,00</h1>
                        </div>
                    </div>
                    <Button type="primary" className={styles.botao} onClick={handleReserveClick}>
                        Fazer Reserva
                    </Button>
                </div>
            </Col>
          </Row>
        
      </div>
  );
}
