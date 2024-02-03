'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from "./styles.module.css";
import { Button, Carousel, Image, InputNumber, Rate } from 'antd';
import { List, NumberInput, PeriodoDatas } from '@/components/Inputs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
}

export default function Hotel() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  
  const tipos = ["Familia Premium", "Familia", "Solteiro"]

  const categoriesList = [{}];
  return (
    <div className={styles.container}>
      <div className={styles.imagesContainer}>
          <div className={styles.mainImage}>
            <Image
              alt="Imagem do hotel"
              width={'100%'}
              height={'100%'}
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
            />  
            <div className={styles.location}>
              <span style={{zIndex:999}}>RS - Gravataí</span>
            </div>
          </div>
          
      </div>
      <div className={styles.content}>
        <div className={styles.hotelInfo}>
          <div className={styles.description}>
            <Rate allowHalf disabled style={{fontSize:35, color:"var(--red)"}} defaultValue={5}/>
            <p>
            O Hotel INF Gravataí é o seu refúgio acolhedor em uma cidade cheia de encanto e história. Seja para uma viagem de negócios ou uma escapada relaxante, esperamos tornar a sua estadia memorável. Explore as belezas de Gravataí enquanto desfruta do conforto e da hospitalidade que oferecemos. Seja nosso hóspede e descubra o melhor de Gravataí!
            </p>
          </div>
          <div className={styles.listContainer}>
            <h1>Serviços oferecidos</h1>
              <div className={styles.services}>
                <div className={styles.service}>a</div>
                <div className={styles.service}>a</div>
                <div className={styles.service}>a</div>
                <div className={styles.service}>a</div>
                <div className={styles.service}>a</div>
                <div className={styles.service}>a</div>
                <div className={styles.service}>a</div>
                <div className={styles.service}>a</div>
              </div>
          </div>
          <div className={styles.listContainer}>
            <h1>Tipos de quarto disponíveis</h1>
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
            <div className={styles.rooms}>
              <div className={styles.room}>
                <span>
                  <div className={styles.type}>Tipo do quarto</div>
                  <div className={styles.bedrooms}>Qtde de camas: {"aqui"}</div>
                  <div className={styles.price}>R$ {"DINHEIRO"}</div>
                </span>
                <div className={styles.roomImage}>
                  <Image
                    alt="Imagem do hotel"
                    width={'100%'}
                    height={'100%'}
                    src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
                  /> 
                </div>
              </div>
              <div className={styles.room}>
                <span>
                    <div className={styles.type}>Tipo do quarto</div>
                    <div className={styles.bedrooms}>Qtde de camas: {"aqui"}</div>
                    <div className={styles.price}>R$ {"DINHEIRO"}</div>
                  </span>
                  <div className={styles.roomImage}>
                    <Image
                      alt="Imagem do hotel"
                      width={'100%'}
                      height={'100%'}
                      src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
                    /> 
                  </div>
              </div>
              <div className={styles.room}>
                <span>
                  <div className={styles.type}>Tipo do quarto</div>
                  <div className={styles.bedrooms}>Qtde de camas: {"aqui"}</div>
                  <div className={styles.price}>R$ {"DINHEIRO"}</div>
                </span>
                <div className={styles.roomImage}>
                  <Image
                    alt="Imagem do hotel"
                    width={'100%'}
                    height={'100%'}
                    src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
                  /> 
                </div>
              </div>
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
                  <PeriodoDatas label={"Escolha a data da sua viagem"} fieldProps={...field} />
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
