import React from 'react'
import styles from "./styles.module.css";
import {Button, Image, Rate} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import Link from 'next/link';

type Props = {
  endereco: String;
  nome: String;
  avaliacao: number;
  id: number
}

export default function HotelCard({endereco, nome, avaliacao, id}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          alt="Imagem do hotel"
          width={"100%"}
          src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.location}>
          <div className={styles.city}>{nome}</div>
          <div className={styles.street}>{endereco}</div>
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
