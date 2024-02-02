import React, { useState } from 'react'
import styles from "./style.module.css"
import { Avaliacao, Categorias, Local, NroHospedes, PeriodoDatas, Servicos } from '@/components/Inputs';
import { FilterOutlined } from '@ant-design/icons';
import { type SelectProps } from 'antd';

type Props = {}

export default function index({}: Props) {
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
  )
}