// LogoComponent.js
import React from 'react';
import Image from 'next/image';
import logo from "@assets/logo-icon.png";
import Link from 'next/link';
import styles from './style.module.css';

const LogoComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href={"/"} className={styles.logoLink}>
          <Image src={logo} alt="fodase" className={styles.logoImage}></Image>
          <span className={styles.logoTextMd}>INF HOTÉIS</span>
        </Link>
      </div>
    </div>
  );
};

export default LogoComponent;