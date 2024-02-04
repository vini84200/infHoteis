// components/Footer.js
import React from 'react';
import { MailOutlined, InstagramOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@assets/logo-icon.png";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <Link href="https://gmail.com" target="_blank" rel="noopener noreferrer">
            <MailOutlined />
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramOutlined />
        </Link>
      </div>
      <div className={styles.pageLinks}>
        <Link href="/about">Sobre Nós</Link>
        <Link href="/contact">Contato</Link>
        <Link href="/terms">Termos de Serviço</Link>
      </div>
      <div className={styles.imageContainer}>
        <Image src={logo} className={styles.logo} alt="Footer Image" />
      </div>
      <div className={styles.copyright}>
        &copy; 2024 Inf Hotéis. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
