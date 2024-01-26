// LogoComponent.js
import React from 'react';
import Image from 'next/image';
import logo from "@assets/logo-icon.png";
import Link from 'next/link';
import styles from './style.module.css';
import type { MenuProps } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd';
const LogoComponent = () => {
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
            <div style={{display:'flex',flexDirection:'row', alignItems:'center', gap: 5, fontSize: 'clamp(.7rem, 1vw, .8rem)'}}>
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
        {
            key: '4',
            label: (
                <div className={styles.mobileLink}>
                    <Link className={styles.link} href={"/login"}>Serviços</Link>
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div className={styles.mobileLink}>
                    <Link className={styles.link} href={"/login"}>História</Link>
                </div>
            ),
        },
        {
            key: '1',
            label: (
                <Link className={styles.loginLink} href={"/login"}>Faça login</Link>
            ),
        },
        {
            key: '2',
            label: (
            <div style={{display:'flex',flexDirection:'row', alignItems:'center', gap: 5, fontSize: 'clamp(.7rem, 1vw, .8rem)'}}>
                ou
                <Link className={styles.registerLink} href={"/register"}>cadastre-se</Link>
            </div>
            ),
        },  
    ];

    return (
        <nav className={styles.container}>
            <div className={styles.logoContainer}>
                <Link style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10%'}} href={"/"}>
                    <Image className={styles.logo} src={logo} alt="logo" />
                </Link>
            </div>
            <div className={styles.linksContainer}>
                <Link className={styles.link} href={"/login"}>Hotéis</Link>
                <Link className={styles.link} href={"/login"}>Serviços</Link>
                <Link className={styles.link} href={"/login"}>História</Link>
            </div>
            <div className={styles.userContainer}>
                <div className={styles.accountContainer}>
                    <Link className={styles.loginLink} href={"/login"}>Faça login</Link>
                    <div style={{display:'flex',flexDirection:'row', alignItems:'center', gap: 5, fontSize: 'clamp(.7rem, 1vw, .8rem)'}}>
                        ou
                        <Link className={styles.registerLink} href={"/register"}>cadastre-se</Link>
                    </div>
                </div>
                <UserOutlined style={{ fontSize: 'calc(var(--header-height)*0.5)', color: 'black' }}/>
            </div>
            <div className={styles.mobileContainer}>
                <Dropdown className={`${styles.accountDropdown} ${styles.show}`} menu={{ items }} placement="bottomRight" trigger={['click']}>
                    <UserOutlined style={{ fontSize: 'calc(var(--header-height)*0.5)', color: 'black' }}/>
                </Dropdown>
                <Dropdown className={`${styles.accountDropdown} ${styles.hidden}`} menu={{ items: items2 }} placement="bottomRight" trigger={['click']}>
                    <MenuOutlined style={{ fontSize: 'calc(var(--header-height)*0.35)', color: 'black' }}/>
                </Dropdown>
            </div>
        </nav>
    );
};

export default LogoComponent;