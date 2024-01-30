'use client';
import React from 'react';
import styles from "./styles.module.css";
import { Carousel, Image } from 'antd';


export default function Hoteis() {
  return (
    <div className={styles.container}>
      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
      <div className={styles.imagesContainer}>
          <div className={styles.mainImage}>
            <Image
              alt="Imagem do hotel"
              width={'100%'}
              height={'100%'}
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
            />  
            <div className={styles.location}>
              <span style={{zIndex:99}}>RS - Gravataí</span>
            </div>
          </div>
          
      </div>
      <div className={styles.content}>
        <div className={styles.hotelInfo}></div>
        <div className={styles.bookingInfo}></div>
      </div>
      {/* <div className={styles.imagesSlider}>       
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
        <Image height={130} alt="imagem" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
        <Image alt="imagem" height={130} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
      </div> */}
      </Image.PreviewGroup>
    </div>
  );
}
