import React from 'react'
import styles from "./styles.module.css";
import { Button, Image, Rate } from 'antd';
import { RightOutlined } from '@ant-design/icons';
type Props = {
    street: String;
    city: String;
    rate: number;
}

export default function HotelCard({street, city, rate}: Props) {
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
                <div className={styles.city}>{city}</div>
                <div className={styles.street}>{street}</div>
            </div>
            <div className={styles.buttonMenu}>
                <Rate allowHalf disabled style={{color: "var(--red)"}} value={rate} />
                <Button type="primary" shape="circle" icon={<RightOutlined />} size={'large'} />
            </div>
        </div>
    </div>
  )
}