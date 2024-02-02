import { Button, Dropdown, Space, Input, Flex, Divider, Col, Row, Form, Slider, Image } from 'antd';
import { WifiOutlined, CoffeeOutlined, CarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './Reserva.css';
import minhaImagem from './hotel2.png';

declare module "*.jpg";

const Reserva = () => {    
  
    return (
      <div className="pageStyle">
        <Row>
          <Col span={12}>
            <div className="columns">
            <p style={{fontSize: '40px'}}>Faça sua reserva!</p>
            <div style={{border: '5px'}}>
              <div style={{fontSize: '30px'}}>
                  <p >Passo 1: Verifique sua reserva</p>
              </div>
                <p >Comodidades:</p>
                <Space>
                  <WifiOutlined />
                  <p>Wifi</p>
                  <CoffeeOutlined />
                  <p>Café da manhã</p>
                  <CarOutlined />
                  <p>Estacionamento</p>
                </Space>

                <Space>
                  <ClockCircleOutlined />
                  <p>Check-in:</p>
                </Space>
                
                
              </div>

            <div style={{border: '5px'}}>
              <div style={{fontSize: '30px'}}>
                  <p >Passo 2: Dados pessoais</p>
              </div>
                <p >Nome completo:</p>
                <Input placeholder="Jane Doe" variant="filled" className="inputStyle"/>
                <p >Email:</p>
                <Input placeholder="exemplo@email.com" variant="filled" className="inputStyle"/>
                <p >Telefone:</p>
                <Input placeholder="99 99999-9999" variant="filled" className="inputStyle"/>
              </div>
            
              <div style={{border: '5px'}}>
              <div style={{fontSize: '30px'}}>
                  <p >Passo 3: Pagamento</p>
              </div>
                <p >Nome no cartão:</p>
                <Input placeholder="JANE DOE" variant="filled" className="inputStyle"/>
                <p >Numero do cartão</p>
                <Input placeholder="9999 9999 9999 9999" variant="filled" className="inputStyle"/>
                <Space>
                  <div>
                    <p >Data de Validade:</p>
                    <Input placeholder="11/11" variant="filled" className="inputStyle"/>
                  </div>
                  <div>
                    <p >Código de segurança:</p>
                    <Input placeholder="999" variant="filled" className="inputStyle"/>
                  </div>
                </Space>
              </div>
              </div>
            </Col>

            <Col span={12}>
            <div className="columns">
              <div className="imageBorder">
                
                  <img src={minhaImagem.src} alt="quarto" width={'80%'} height={'50%'} style={{ borderRadius: '10px' }}/>
                

              </div>
              
              <Button type="primary" style={{ backgroundColor: 'grey', borderColor: 'grey' }}>
                      Fazer Reserva
              </Button>
              </div>
            </Col>
          </Row>
        
      </div>
    );
  };
  
  export default Reserva;