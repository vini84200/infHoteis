'use client';
import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button, Divider, Form, Input, message, Typography} from "antd";
import login from "@/apiOperations/users/login";
import {useRouter} from "next/navigation";
import Link from "next/link";

const {Title} = Typography;

interface LoginFormData {
  username: string;
  password: string;
}

export default function Login() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginFormData) => login(data.username, data.password),
    onError: (error) => {
      console.log("Erro mu")
      messageApi.error(error.message);
    },
    onSuccess: () => {
      messageApi.success("Login realizado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ['me']
      })
      router.push('/');
    }
  })

  const onFormFinish = (values: LoginFormData) => {
    console.log('Success:', values);
    loginMutation.mutate(values);
  };

  const onFormFinishFailed = (errorInfo: any) => {
    // todo handle form finish fail
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {contextHolder}
      <div className={"grid md:grid-cols-2 h-screen"}>
        <div>
          <div
            className={"flex flex-col justify-center items-center h-screen"}
          >
            <h1
              className={"md:invisible text-6xl font-bold m-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"}>
              Inf Hotéis
            </h1>
            <Title level={1}>Entrar</Title>
            <Form<LoginFormData>
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{remember: true}}
              onFinish={onFormFinish}
              onFinishFailed={onFormFinishFailed}
            >

              <Form.Item label="Usuário" name="username"
                         rules={[
                           {
                             required: true,
                             message: 'Por favor, insira seu usuário!',
                           },
                         ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item label="Senha" name="password"
                         rules={[
                           {
                             required: true,
                             message: 'Por favor, insira sua senha!',
                           },
                         ]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" className={"mr-2"} htmlType="submit">
                  Entrar
                </Button>
                <Button htmlType="button" type={"link"}>
                  Esqueci minha senha
                </Button>
              </Form.Item>
            </Form>
            <Divider/>
            Ou
            <Link href={"/register"}>
              <Button type="link" className={"mr-2"}>
                Criar uma conta
              </Button>
            </Link>
          </div>
        </div>
        <div className={"hidden md:block"}>
          <div className={"md:h-full bg-gradient-to-r from-cyan-500 to-blue-500 py-8"}>
            <h1
              className={"text-6xl text-center text-white font-bold h-full flex flex-col justify-center items-center m-0"}>
              Inf Hotéis
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
