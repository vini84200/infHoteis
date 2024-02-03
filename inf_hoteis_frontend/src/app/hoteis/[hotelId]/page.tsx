'use client';
import React, {useState} from 'react';
import styles from "./styles.module.css";
import {Button, Image, InputNumber, message, Rate} from 'antd';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useQuery} from "@tanstack/react-query";
import api from "@/apiOperations/api";

type Inputs = {
  [key: string]: number;
}

interface Hotel {
  id: number;
  nome: string;
  endereco: string;
  avaliacao: number;
  descricao: string;
}

export default function Hotel({params}: { params: { hotelId: string } }) {
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


  const {nome, endereco, avaliacao, descricao} = hotelQuery.data ?? {nome: "", endereco: "", avaliacao: 0};

  if (hotelQuery.isLoading) {
    return <div>Carregando...</div>
    // TODO: Fazer um loading bonito
  }

  if (hotelQuery.isError) {
    messageApi.error("Erro ao buscar hotel").then()
  }


  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.imagesContainer}>
        <div className={styles.mainImage}>
          <Image
            alt="Imagem do hotel"
            width={'100%'}
            height={'100%'}
            src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
          />
          <div className={styles.location}>
            <span style={{zIndex: 999}}>{nome}</span>
          </div>
        </div>

      </div>
      <div className={styles.content}>
        <div className={styles.hotelInfo}>
          <div className={styles.description}>
            <Rate allowHalf disabled style={{fontSize: 35, color: "var(--red)"}} defaultValue={5}/>
            <p>
              {descricao}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              <div className={styles.roomsSet}>
                {tipos.map((item, i) => {
                  return (
                    <div key={i} className={styles.roomSelect}>
                      <span className={styles.label}>Selecione a quantiade de quartos para o tipo {item}</span>
                      <div className={styles.roomTypeSelect}>
                        <Controller
                          name={item}
                          control={control}
                          render={({field, fieldState}) => (
                            <InputNumber
                              controls={false}
                              bordered={false}
                              {...field}
                              placeholder={""}
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
            <Button type="primary" htmlType="submit" className={styles.confirmButton}>RESERVAR AGORA</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
