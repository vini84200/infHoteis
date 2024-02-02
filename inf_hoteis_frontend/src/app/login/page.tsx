'use client';
import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button, Divider, Form, Input, message, Typography} from "antd";
import login from "@/apiOperations/users/login";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import SideLogo from "@components/SideLogo"
import styles from '@styles/formPage.module.css'

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
      // console.log("Erro mu")
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
    // console.log('Success:', values);
    loginMutation.mutate(values);
  };

  const onFormFinishFailed = (errorInfo: any) => {
    // todo handle form finish fail
    // console.log('Failed:', errorInfo);
  };

  const searchParams = useSearchParams() 
  const animate = searchParams.get('animate')


  return (
    <div>
      {contextHolder}
      <div className={styles.container}>
        <SideLogo/>
        <div>
          <div
            className={styles.formContainer}
          >
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
                <div className={styles.buttonContainer}>
                  <Button type="primary" htmlType="submit">
                    Entrar
                  </Button>
                  <Button htmlType="button" type={"link"}>
                    Esqueci minha senha
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Divider>
            Ou             
            </Divider>
            <Link href={"/register"}>
              <Button type="link">
                Criar uma conta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
