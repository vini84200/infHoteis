import { InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"

type Props = {
  onChange : any;
  onSearch : any;
}

const filterOption = (input: string, option?: { label: string; value: string }) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export function Local({onChange, onSearch}: Props) {
  return (
    <>
      <div className={styles.name}>Cidade</div>
      <Select
        style={{width: '100%'}}
        showSearch
        placeholder="Selecione uma cidade"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: 'rs-gravatai',
            label: 'RS - Gravataí',
          },
          {
            value: 'rs-portoalegre',
            label: 'RS - Porto Alegre',
          },
          {
            value: 'rs-cachoeirinha',
            label: 'RS - Cachoeirinha',
          },
        ]}
      />
    </>
  )
}

type NroHospedesProps = {
  value : string | number | null;
  setValue : any;
}
export function NroHospedes ({value, setValue} : NroHospedesProps){
  return(
    <>
      <div className={styles.name}>N° de hospedes</div>
      <div className={styles.input}><InputNumber style={{width: '100%'}} min={1} max={6} value={value} onChange={setValue} /></div>
    </>
  )
}

export function Categorias ({onChange, onSearch}: Props){
  return(
    <>
      <div className={styles.name}>Tipo de quarto</div>
      <Select
        style={{width: '100%'}}
        showSearch
        placeholder="Selecione um tipo de quarto"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: 'familia-premium',
            label: 'Familia Premium',
          },
          {
            value: 'familia',
            label: 'Familia',
          },
          {
            value: 'solteiro',
            label: 'Solteiro',
          },
        ]}
      />
    </>
  )
}

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
export function PeriodoDatas (){
  return(
    <>
      <div className={styles.name}>Data da viagem</div>
      <div className={styles.input}>
        <RangePicker style={{width: '100%'}} format={"DD/MM/YYYY"}/>
      </div>
    </>
  )
}

import { Rate } from 'antd';
import { SelectProps } from 'antd/lib';
export function Avaliacao (){
  return(
    <>
      <div className={styles.name}>Avaliação mínima do hotel</div>
      <div className={styles.input}>
        <Rate allowHalf allowClear/>
      </div>
    </>
  )
}

type ServicosProps = {
  options : SelectProps['options'];
  onChange : any;
}
export function Servicos ({onChange, options} : ServicosProps){
  const [selectedOptions, setSelectedOptions] = useState<SelectProps['options']>([]);
  const filteredOptions = (options && selectedOptions) && (options.filter((o) => !selectedOptions.includes(o.value)));
  return(
    <>
      <div className={styles.name}>Serviços oferecidos</div>
      <div className={styles.input}>
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Selecione os serviços desejados"
        onChange={setSelectedOptions}
        options={filteredOptions}
      />
      </div>
    </>
  )
}