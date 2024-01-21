"use client"
import {Button, Divider, Form, Input, message} from 'antd';
import React from 'react';
import {useMutation} from "@tanstack/react-query";
import {register} from "@/apiOperations/users/register";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import Link from "next/link";
import Title from 'antd/es/typography/Title';
import SideLogo from "@components/SideLogo";

interface RegisterFormData {
  username: string;
  password: string;
  email: string;
}

function Page() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => {
      // console.log(data)
      return register(data.username, data.password, data.email)
    },
    onSuccess: () => {
      // console.log("Success")
      messageApi.success("Cadastro realizado com sucesso!");
      router.push('/login');
    },
    onError: (error: AxiosError) => {
      // console.log("Erro")
      // console.log(error)
      if (error.message === "Network Error") {
        messageApi.error("Não foi possível se conectar ao servidor!")
        return
      }
      if (error.code === "ERR_BAD_REQUEST") {
        messageApi.error("Erro ao cadastrar!")
        const errors = error.response?.data as { [key: string]: string }
        for (const [key, value] of Object.entries(errors)) {
          form.setFields([
            {
              name: key,
              errors: [value]
            }
          ])
        }
      }
    }
  })
  const onFormFinish = (values: RegisterFormData) => {
    // console.log('Success:', values);
    registerMutation.mutate(values);
  };

  return (
    <div>
      {contextHolder}
      <div className={"grid md:grid-cols-2 h-screen"}>
        <SideLogo/>
        <div>
          <div
            className={"flex flex-col justify-center items-center h-auto md:h-screen gap-[20px]"}
          >
            <Title level={1}>Criar conta</Title>
            <Form
              onFinish={onFormFinish}
              form={form}
            >
              <Form.Item
                label={"Nome de usuário"}
                name={"username"}
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira um nome de usuário!',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item label={"Email"} name={"email"}
                        rules={[
                          {
                            required: true,
                            message: 'Por favor, insira um email!',
                          },
                          {
                            type: 'email',
                            message: 'Por favor, insira um email válido!',
                          }
                        ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item label={"Senha"} name={"password"}
                        rules={[
                          {
                            required: true,
                            message: 'Por favor, insira uma senha!',
                          },
                          {
                            min: 8,
                            message: 'A senha deve ter no mínimo 8 caracteres!'
                          }
                        ]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item
                label={"Confirmar senha"}
                name={"password_confirm"}
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Por favor, confirme sua senha!',
                  },
                  ({getFieldValue}) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject("As senhas não coincidem!")
                    }
                  })
                ]}>
                <Input.Password/>
              </Form.Item>

              <Form.Item>
                <div className={"flex flex-col gap-4 mt-[25px]"}>
                  <Button type="primary" className={"mr-2 size-full"} htmlType="submit">
                    Cadastrar
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Divider>
              Ou
            </Divider>
            <Link 
               href={"/login"}
              className='text-center'
            >
              <Button htmlType="button" type={"link"}>
                Já tenho uma conta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
