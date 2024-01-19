import { Button, Dropdown, Space, Input, Flex, Divider, Col, Row, Form, Slider } from 'antd';
import { WifiOutlined, CoffeeOutlined, CarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const Reserva = () => {
    const pageStyle = {
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh', 
      padding: '20px', 
      fontFamily: 'montserrat'
    }
  
    return (
      <div style={pageStyle}>
        <Row>
          <Col span={12}>
            <p style={{fontSize: '40px'}}>Faça sua reserva!</p>
            <div style={{border: '5px'}}>
              <div style={{fontSize: '30px'}}>
                  <p >Passo 1: </p>
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
                <p>Escolha opção de cama:</p>
                
              </div>

            <div style={{border: '5px'}}>
              <div style={{fontSize: '30px'}}>
                  <p >Passo 2: dados pessoais</p>
              </div>
                <p >Nome completo:</p>
                <Input placeholder="Jane Doe" variant="filled" style={{ backgroundColor: 'grey' }}/>
                <p >Email:</p>
                <Input placeholder="exemplo@email.com" variant="filled" style={{ backgroundColor: 'grey' }}/>
                <p >Telefone:</p>
                <Input placeholder="99 99999-9999" variant="filled" style={{ backgroundColor: 'grey' }}/>
              </div>
            
              <div style={{border: '5px'}}>
              <div style={{fontSize: '30px'}}>
                  <p >Passo 3: Pagamento</p>
              </div>
                <p >Nome no cartão:</p>
                <Input placeholder="JANE DOE" variant="filled" style={{ backgroundColor: 'grey' }}/>
                <p >Numero do cartão</p>
                <Input placeholder="9999 9999 9999 9999" variant="filled" style={{ backgroundColor: 'grey' }}/>
                <p >Data de Validade:</p>
                <Input placeholder="11/11" variant="filled" style={{ backgroundColor: 'grey' }}/>
                <p >Código de segurança:</p>
                <Input placeholder="999" variant="filled" style={{ backgroundColor: 'grey' }}/>
              </div>
            </Col>

            <Col span={12}>
            <img
              src={require('../../assets/fotoQuarto.jpg').default}
              alt="quarto"
              style={{ width: '300px', height: '200px' }}
            />
              <Button type="primary" style={{ backgroundColor: 'grey', borderColor: 'grey' }}>
                      Fazer Reserva
              </Button>
            </Col>
          </Row>
        

       
        
      </div>
    );
  };
  
  export default Reserva;

  