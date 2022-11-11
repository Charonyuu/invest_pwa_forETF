import React, { useState } from 'react';
import styles from './App.module.scss';
import useFetchData from './hooks/useFetchData';
import DataCard from './component/dataCard';
import Nav from './component/nav';
import { STOCK_COMPANY_ARRAY } from './constant/api';
import {ReactComponent as UpIcon} from './asset/up_icon.svg'
import {ReactComponent as Loading} from './asset/loading.svg'

function App() {
  const {data , loading} = useFetchData()
  const [search,setSearch] = useState()
  const [toggleList ,setToggleList] = useState([
    false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,
  ])

  const toogleMenu = (index) =>{
    const temp = [...toggleList]
    temp[index] = !temp[index]
    setToggleList(temp)
  }
  return (
    <div className={styles.container}>
      <Nav search={search} setSearch={setSearch}/>
      {loading ? 
        <div className={styles.loading}>
          <Loading />
          <p>抓取資料中...</p>
        </div>
      :
        data.map((_list_data,index) => 
        <>
        {_list_data.msgArray &&
          <section key={[index]} id={STOCK_COMPANY_ARRAY[index]} >
            <div className={styles.section_header} onClick={()=>toogleMenu(index)}>
                <h1 >{STOCK_COMPANY_ARRAY[index]}</h1>
                <UpIcon className={toggleList[index] ? styles.turn : styles.turn_back}/>
            </div>
            <DataCard toggle={toggleList[index]} list_data={_list_data.msgArray}/>
          </section>
        }</>
      )}
    </div>
  );
}

export default App;
