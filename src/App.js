import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import axios from 'axios';
import { INVEST_ETF_WORTHS_BASE_URL , STOCK_COMPANY_ARRAY } from './constant/api';
import DataCard from './component/dataCard';


function App() {
  const [data,setData] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true)
    const FetchData = (()=>{
      axios.get(INVEST_ETF_WORTHS_BASE_URL)
      .then((response)=>{
        setData(response.data);
        setLoading(false)
        console.log(response.data);
      }).catch((err)=>{
        console.log('error:' + err);
      })
    })
    FetchData();
  },[])
  
  return (
    <div className={styles.container}>
      {!loading && data.map((_list_data,index)=>
        <section key={STOCK_COMPANY_ARRAY[index]} id={STOCK_COMPANY_ARRAY[index]}>
          <h1 className={styles.title}>{STOCK_COMPANY_ARRAY[index]}</h1>
          <DataCard list_data={_list_data.msgArray}/>
        </section>
      )}
    </div>
  );
}

export default App;
