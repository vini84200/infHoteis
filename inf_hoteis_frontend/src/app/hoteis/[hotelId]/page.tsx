'use client';
import React, {useState} from 'react';
import styles from "./styles.module.css";
import {Button, DatePicker, Form, Image, InputNumber, message, Modal, Rate} from 'antd';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import api from "@/apiOperations/api";
import ReservaModal from "@components/ReservaModal/reservaModal";
import getMe from "@/apiOperations/users/getMe";

type Inputs = {
  [key: string]: number;
}

export interface Hotel {
  nome: string;
  estado: string;
  cidade: string;
  rua: string;
  avaliacao: number;
  descricao: string;
  id: number;
  imagem: string;
}


export interface EspacoHotel {
  nome : string;
  id : number; 
  hotel: number;
  autorizacao: Boolean;
  descricao: string; 
}


export interface TipoQuarto {
  id: number;
  nome: string;
  descricao: string;
  beneficios: {
    nome: string;
  }[];
  preco: number;
  hospedes: number;
  imagem: string;
}

const {RangePicker} = DatePicker;

interface FormData {
  tipo: { id: number; quantidade: any }[];
  data: { inicio: any; fim: any };
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
  const tiposQuery = useQuery<TipoQuarto[]>({
    queryKey: ['hotel', hotelId, 'tipos'],
    queryFn: async () => {
      return api.get(`api/hoteis/${hotelId}/tipos`).then((res) => res.data)
    },
    staleTime: 1000 * 60 * 5,
  });
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData | undefined>();

  const tipos = tiposQuery.data ?? [];
  const [reservationFinishModal, setReservationFinishModal] = useState(false);

  const [reservation, setReservation] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const me = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      return getMe()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const {nome, cidade, estado, imagem, avaliacao, rua, descricao} = hotelQuery.data ?? {
    nome: "",
    endereco: "",
    avaliacao: 0
  };

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
            <div className={styles.location} style={{zIndex: 901}}>
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
                title: 'Tipos de quarto'
              }}
            >
              <div className={styles.rooms}>
                {tipos.map((tipoQuarto, e) => {
                  return (
                    <div key={e} className={styles.room}>
                      <div className={styles.type}>{tipoQuarto.nome}</div>
                      <div className={styles.roomImage}>
                        <Image
                          alt="Imagem do hotel"
                          width={'100%'}
                          height={'100%'}
                          style={{aspectRatio: "1/1", objectFit: "cover"}}
                          src={tipoQuarto.imagem}
                        />
                      </div>
                      <Button
                        type="primary"
                        onClick={() => {
                          Modal.info({
                            title: tipoQuarto.nome,
                            centered: true,
                            content: (
                              <div className={styles.modalContainer}>
                                <div className={styles.bedrooms}>Qtde. de hospedes: {tipoQuarto.hospedes}</div>
                                <h3>Serviços disponíveis</h3>
                                <ul className={styles.services}>
                                  {
                                    tipoQuarto.beneficios.map((beneficio, i) => {
                                      return (
                                        <li key={i} className={styles.service}>{beneficio.nome}</li>
                                      )
                                    })
                                  }
                                </ul>
                                <div className={styles.price}>R$ {tipoQuarto.preco}</div>
                              </div>
                            ),
                            footer: (_, {OkBtn}) => (
                              <>
                                <OkBtn/>
                              </>
                            ),
                          });
                        }}
                      >
                        + detalhes
                      </Button>
                    </div>
                  )
                })}
              </div>
            </Image.PreviewGroup>
          </div>
        </div>

        <div className={styles.bookingInfo}>
          <h1>INFORMAÇÕES DA RESERVA</h1>
          <h3 className={styles.subtitle}>Selecione a quantidade de quartos para cada categoria</h3>
          <Form
            name={"reserva"}
            form={form}
            onFinish={(a) => {
              console.log(a)
              const data: FormData = {
                tipo: Object.keys(a.tipo).filter((k) => Number(k) > 0).map((k) => ({
                  id: Number(k),
                  quantidade: a.tipo[k]
                })),
                data: {
                  inicio: a.date[0].toISOString().slice(0, 10),
                  fim: a.date[1].toISOString().slice(0, 10)
                }
              }
              console.log(data)
              // reservaMutation.mutate(data)
              setReservationFinishModal(true)
              setFormData(data)
            }}
            onFinishFailed={(a) => {
            }}
            requiredMark={false}
          >
            {
              <div className={styles.roomsSet}>
                {tipos.map((item, i) => {
                  return (
                    <div key={i} className={styles.roomSelect}>
                      <Form.Item
                        name={['tipo', item.id]}
                        label={item.nome}
                        className={styles.field}
                        required={false}
                        rules={[
                          {
                            type: 'number',
                          }
                        ]}
                      >
                        {/*<div className={styles.roomTypeSelect}>*/}
                        <InputNumber
                          controls={false}
                          bordered={true}
                        />
                        {/*</div>*/}
                      </Form.Item>
                    </div>
                  )
                })}
              </div>
            }
            <div className={styles.date}>
              <Form.Item
                name="date"
                label="Período da reserva"
                rules={[
                  {required: true, message: 'Insira o período da reserva'},
                  {
                    validator: (d, value) => {
                      if (!value || !value[0] || !value[1]) {
                        return Promise.resolve()
                      }
                      if (value[0] < new Date()) {
                        return Promise.reject("A data inicial deve ser no futuro")
                      }
                      // Verificar se a reserva é de no mínimo 1 dia
                      if (value[1] - value[0] < 24 * 60 * 60 * 1000) {
                        return Promise.reject("A reserva deve ser de no mínimo 1 dia")
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
              >
                <RangePicker/>
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.confirmButton}
                      onClick={() => {
                        form.validateFields().then().catch((e) => {
                          console.log("Erro ao validar campos", e)
                        })
                      }}
                      disabled={
                        me.data?.logged_in === false
                      }
              >
                {me.data?.logged_in === false ? "Faça login para reservar" : "RESERVAR AGORA"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {!!formData &&
        <Modal
          open={reservationFinishModal}
          footer={null}
          onCancel={() => {
            setReservationFinishModal(false)
          }}

        >

          < ReservaModal reserva={{
            preco: formData.tipo.reduce((acc, t) => {
              console.log(t, acc)
              if (t.quantidade === 0 || !t.quantidade) {
                return acc
              }
              const tipo = tipos.find((tipo) => tipo.id === t.id)
              if (!tipo) {
                return acc
              }
              return acc + Number(tipo.preco) * t.quantidade
            }, 0) * ((new Date(formData.data.fim).getTime() - new Date(formData.data.inicio).getTime()) / (24 * 60 * 60 * 1000)),
            dataInicio: formData.data.inicio,
            dataFim: formData.data.fim,
            hotel: hotelQuery.data!,
            quartos: formData.tipo.map((t) => ({
              tipo: tipos.find((tipo) => tipo.id === t.id)!,
              quantidade: t.quantidade,
              id: t.id
            }))


          }}/>
        </Modal>
      }
    </div>
  );
}
