import React from 'react'
import styles from "./styles.module.css";
import {Button, Image, Rate} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import Link from 'next/link';
import { Hotel } from '@/app/hoteis/page';

export default function HotelCard({src, cidade, estado, rua, nome, avaliacao, id}: Hotel) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          alt="Imagem do hotel"
          width={"100%"}
          src={src}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.location}>
          <div className={styles.city}>{cidade} - {estado}</div>
          <div className={styles.street}>{rua}</div>
        </div>
        <div className={styles.buttonMenu}>
          <Rate allowHalf disabled style={{color: "var(--red)"}} value={avaliacao}/>
          <Link href={`/hoteis/${id}`}>
            <Button type="primary" shape="circle" icon={<RightOutlined/>} size={'large'}/>
          </Link>
        </div>
      </div>
    </div>
  )
}
