import { InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"

type T = {
  label: string;
  value: string;
}

type Props = {
  label: string;
  options: Array<T>;
  onChange : any;
  onSearch : any;
}

const filterOption = (input: string, option?: { label: string; value: string }) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export function List({options, label, onChange, onSearch}: Props) {
  return (
    <>
      <div className={styles.name}>{label}</div>
      <Select
        style={{width: '100%'}}
        showSearch
        placeholder={"Selecione uma opção"}
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={options}
      />
    </>
  )
}

type NumberProps = {
  label : string;
  value : string | number | null;
  setValue : any;
}
export function NumberInput ({label, value, setValue} : NumberProps){
  return(
    <>
      <div className={styles.name}>{label}</div>
      <div className={styles.input}><InputNumber style={{width: '100%'}} min={1} max={6} value={value} onChange={setValue} /></div>
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