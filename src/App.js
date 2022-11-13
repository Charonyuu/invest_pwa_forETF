import React, { useState } from 'react';
import styles from './App.module.scss';
import useFetchData from './hooks/useFetchData';
import useWindowSize from './hooks/useWindowSize';
import DataCard from './component/dataCard';
import DataTable from './component/datatable';
import Nav from './component/nav';

import { STOCK_COMPANY_ARRAY } from './constant/api';
import {ReactComponent as UpIcon} from './asset/up_icon.svg'
import {ReactComponent as Loading} from './asset/loading.svg'

function App() {
  const { width } = useWindowSize();
  const {data , loading , error} = useFetchData()
  const [option,setOption] = useState('all')
  const [search,setSearch] = useState('')
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
      <Nav 
        search={search} 
        setSearch={setSearch} 
        option={option} 
        setOption={setOption}
        toggleList={toggleList}
        setToggleList={setToggleList}  
      />
      {loading ? 
        <div className={styles.loading}>
          <Loading />
          <p>抓取資料中...</p>
          {error && error}
        </div>
      :
        data.map((_list_data,index) => 
        <>
        {_list_data.msgArray &&
          <section key={STOCK_COMPANY_ARRAY[index]} id={STOCK_COMPANY_ARRAY[index]} >
            {(!search && option === 'all') &&
              <div className={styles.section_header} onClick={()=>toogleMenu(index)}>
                  <h1 >{STOCK_COMPANY_ARRAY[index]}</h1>
                  <UpIcon className={toggleList[index] ? styles.turn : styles.turn_back}/>
              </div>
            }
            {width < 500 ?
            <DataCard 
              filter={search} 
              toggle={toggleList[index]} 
              list_data={_list_data.msgArray}
              option={option}
            />
            :
            <DataTable filter={search} toggle={toggleList[index]} list_data={_list_data.msgArray}/>
            }
          </section>
        }</>
      )}
    </div>
  );
}

export default App;
