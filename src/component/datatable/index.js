import React from 'react'
import styles from './index.module.scss';

export default function DataCard({list_data}) {
    const company_etf_list_data = list_data 
  return (
    <div className={styles.table}>
        <div className={styles.row}>
            <h4 >標的編號</h4>
            <h4 className={styles.etf_name}>標的名稱</h4>
            <h4>目前成交價</h4>
            <h4>預估淨值</h4>
            <h4>折益價</h4>
            <h4>資料時間</h4>
        </div>
        {company_etf_list_data && company_etf_list_data.map((item,index)=>{
            const lastest_worth_time = item.i.slice(0,4)+ '/' + item.i.slice(4,6)+ '/'+item.i.slice(6,8)+ '-' + item.j
            return(
            <div key={item.a} className={styles.row}>
                <p>{item.a}</p>
                <p className={styles.etf_name}>{item.b}</p>
                <p>{item.e}</p>
                <p>{item.f}</p>
                <p>{item.g}</p>
                <p>{lastest_worth_time}</p>
            </div>
            )
        })}
      
    </div>
  )
}
