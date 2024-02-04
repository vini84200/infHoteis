'use client';
import React, {useEffect, useState} from 'react';
import styles from "./styles.module.css";
import {Button, Image, InputNumber, message, Modal, Rate} from 'antd';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useQuery} from "@tanstack/react-query";
import api from "@/apiOperations/api";
import { PeriodoDatas } from '@/components/Inputs';

type Inputs = {
  [key: string]: number;
}

export interface Hotel {
  nome: string;
  estado: string;
  cidade: string;
  rua: string;
  avaliacao: number;
  id: number;
  imagem: string;
}

export default function Hotel({params}: { params: { hotelId: string } }) {
  const [open, setOpen] = useState(false);
  const hotelId = params.hotelId;
  const hotelQuery = useQuery<Hotel>({
    queryKey: ['hotel', hotelId],
    queryFn: async () => {
      return api.get(`api/hoteis/${hotelId}`).then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });
  const tipos = ["Familia Premium", "Familia", "Solteiro"]

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const [reservation, setReservation] = useState();
  const [messageApi, contextHolder] = message.useMessage();


  const {nome, cidade, estado, imagem, avaliacao, rua, descricao} = hotelQuery.data ?? {nome: "", endereco: "", avaliacao: 0};

  if (hotelQuery.isLoading) {
    return <div>Carregando...</div>
    // TODO: Fazer um loading bonito
  }

  if (hotelQuery.isError) {
    messageApi.error("Erro ao buscar hotel").then()
  }

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.imagesContainer}>
        <div className={styles.mainImage}>
          <Image
            alt="Imagem do hotel"
            width={'100%'}
            height={'100%'}
            src={imagem}
          />
          <div className={styles.locationContainer}>
            <div className={styles.location} style={{zIndex: 999}}>
              <span>{cidade} - {estado}</span>
              <span>{nome}</span>
              <span>{rua}</span>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.content}>
        <div className={styles.hotelInfo}>
          <div className={styles.description}>
            <Rate allowHalf disabled style={{fontSize: 35, color: "var(--red)"}} defaultValue={avaliacao}/>
            <p>
              {descricao}
            </p>
          </div>
          <div className={styles.listContainer}>
            <h1>Tipos de quarto disponíveis</h1>
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <div className={styles.rooms}>
                {tipos.map((i, e)=>{
                  return (
                    <div key={e} className={styles.room}>
                      <div className={styles.type}>{i}</div>
                      <div className={styles.roomImage}>
                        <Image
                          alt="Imagem do hotel"
                          width={'100%'}
                          height={'100%'}
                          src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
                        />
                      </div>
                      <Button 
                        type="primary" 
                        onClick={() => {
                          Modal.info({
                            title: i,
                            centered: true,
                            content: (
                              <div className={styles.modalContainer}>
                                <div className={styles.bedrooms}>Qtde de camas: {"aqui"}</div>                     
                                <h3>Serviços disponíveis</h3>
                                <ul className={styles.services}>
                                  <li className={styles.service}>a</li>
                                  <li className={styles.service}>a</li>
                                  <li className={styles.service}>a</li>
                                  <li className={styles.service}>a</li>
                                  <li className={styles.service}>a</li>
                                  <li className={styles.service}>a</li>
                                  <li className={styles.service}>a</li>
                                  <li className={styles.service}>a</li>
                                </ul>
                                <div className={styles.price}>R$ {"DINHEIRO"}</div>
                              </div>
                            ),
                            footer: (_, { OkBtn }) => (
                              <>
                                <OkBtn />
                              </>
                            ),
                          });
                        }}
                      >
                        + detalhes
                      </Button>
                    </div>
                  )})}
                
              </div>
            </Image.PreviewGroup>
          </div>
        </div>
        <div className={styles.bookingInfo}>
          <h1>INFORMAÇÕES DA RESERVA</h1>
          <h3 className={styles.subtitle}>Selecione a quantiade de quartos para cada categoria</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              <div className={styles.roomsSet}>
                {tipos.map((item, i)=>{
                  return (
                    <div key={i} className={styles.roomSelect}>
                      <span className={styles.label}>{item}:</span>
                      <div className={styles.roomTypeSelect}>
                        <Controller
                            name={item}
                            control={control}
                            render={({ field, fieldState }) => (
                              <InputNumber
                                controls={false}
                                bordered={false}
                                {...field}
                                placeholder={"0"}
                                className={styles.field}
                              />
                            )}
                          />
                      </div>
                    </div>
                  )
                })}
              </div>
            }
            <div className={styles.date}>
              <Controller
                name={"data"}
                control={control}
                render={({ field }) => (
                  <PeriodoDatas label={"Escolha a data da sua viagem"} fieldProps={...field}/>
                )}
              />
            </div>
            <Button type="primary" htmlType="submit" className={styles.confirmButton}>RESERVAR AGORA</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
