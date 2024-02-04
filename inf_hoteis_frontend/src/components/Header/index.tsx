// LogoComponent.js
import React from 'react';
import Image from 'next/image';
import logo from "@assets/logo-icon.png";
import Link from 'next/link';
import styles from './style.module.css';
import {Button, Dropdown, MenuProps, message} from 'antd';
import {MenuOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import getMe from "@/apiOperations/users/getMe";

async function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
}

const LogoComponent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const me = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      return getMe()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const isLoggedin = me.data?.logged_in ?? false;
  console.log(me)
  if (me.isError) {
    messageApi.error("Erro ao buscar usuário logado").then()
  }

  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => logout(),
        onSuccess: () => {
        queryClient.invalidateQueries({
            type: 'all'
        })},
    })

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link className={styles.loginLink} href={"/login"}>Faça login</Link>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          fontSize: 'clamp(.7rem, 1vw, .8rem)'
        }}>
          ou
          <Link className={styles.registerLink} href={"/register"}>cadastre-se</Link>
        </div>
      ),
    },
  ];

  const items2: MenuProps['items'] = [
    {
      key: '3',
      label: (
        <div className={styles.mobileLink}>
          <Link className={styles.link} href={"/login"}>Hotéis</Link>
        </div>
      ),
    },
    // {
    //   key: '4',
    //   label: (
    //     <div className={styles.mobileLink}>
    //       <Link className={styles.link} href={"/login"}>Serviços</Link>
    //     </div>
    //   ),
    // },
    // {
    //   key: '5',
    //   label: (
    //     <div className={styles.mobileLink}>
    //       <Link className={styles.link} href={"/login"}>História</Link>
    //     </div>
    //   ),
    // },
    {
      key: '1',
      label: (
        <Link className={styles.loginLink} href={"/login"}>Faça login</Link>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          fontSize: 'clamp(.7rem, 1vw, .8rem)'
        }}>
          ou
          <Link className={styles.registerLink} href={"/register"}>cadastre-se</Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <nav className={styles.container}>
        <div className={styles.logoContainer}>
          <Link style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10%'}} href={"/"}>
            <Image className={styles.logo} src={logo} alt="logo"/>
          </Link>
        </div>
        <div className={styles.linksContainer}>
          <Link className={styles.link} href={"/hoteis"}>Hotéis</Link>
          {/* <Link className={styles.link} href={"/login"}>Serviços</Link>
          <Link className={styles.link} href={"/login"}>História</Link> */}
        </div>
        <div className={styles.userContainer}>
          { !isLoggedin ? 
            <div className={styles.accountContainer}>
                <Link className={styles.loginLink} href={"/login"}>Faça login</Link>
                <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                fontSize: 'clamp(.7rem, 1vw, .8rem)'
                }}>
                ou
                <Link className={styles.registerLink} href={"/register"}>cadastre-se</Link>
                </div>
            </div>
            :
            <div className={styles.accountContainer}>
                <Link className={styles.loginLink} href={"/perfil"}>{me.data?.username}</Link>
                <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                fontSize: 'clamp(.9rem, 1.2vw, 1rem)'
                }}>
                    <Button onClick={()=>logoutMutation.mutate()} className={styles.registerLink}>Sair <LogoutOutlined /></Button>
                </div>
            </div>
          }
          <UserOutlined style={{fontSize: 'calc(var(--header-height)*0.5)', color: 'black'}}/>
        </div>
        <div className={styles.mobileContainer}>
          <Dropdown className={`${styles.accountDropdown} ${styles.show}`} menu={{items}} placement="bottomRight"
                    trigger={['click']}>
            <UserOutlined style={{fontSize: 'calc(var(--header-height)*0.5)', color: 'black'}}/>
          </Dropdown>
          <Dropdown className={`${styles.accountDropdown} ${styles.hidden}`} menu={{items: items2}}
                    placement="bottomRight" trigger={['click']}>
            <MenuOutlined style={{fontSize: 'calc(var(--header-height)*0.35)', color: 'black'}}/>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default LogoComponent;
