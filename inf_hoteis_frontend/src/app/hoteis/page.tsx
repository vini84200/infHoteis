'use client';
import React, { useState } from 'react';
import styles from "@styles/hotelsPage.module.css"
import Sider from 'antd/lib/layout/Sider';
import { Avaliacao, Categorias, Local, NroHospedes, PeriodoDatas, Servicos } from '@/components/Inputs';
import { Pagination, type SelectProps } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

export default function Hoteis() {
  const [value, setValue] = useState<string | number | null>('1');
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const options: SelectProps['options'] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <h2 className={styles.title}>FILTROS <FilterOutlined style={{fontSize: 20}}/></h2>
        <div className={styles.field}>
          <Local onChange={onChange} onSearch={onSearch}/>
        </div>
        <div className={styles.field}>
          <NroHospedes value={value} setValue={setValue}/>
        </div>
        <div className={styles.field}>
          <Categorias onChange={onChange} onSearch={onSearch}/>
        </div>
        <div className={styles.field}>
          <PeriodoDatas />
        </div>
        <div className={styles.field}>
          <Avaliacao />
        </div>   
        <div className={styles.field}>
          <Servicos onChange={onChange} options={options}/>
        </div>       
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.hotelsContainer}>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>        
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div>
          <div className={styles.hotel}>Hotel cada hotel deve apresentar uma foto e
  sua localização embaixo (cidade, estado e rua).</div> 
        </div>
        <div className={styles.pagination}>
          <Pagination defaultCurrent={1} total={50} />       
        </div>
      </div>
    </div>
  );
}
