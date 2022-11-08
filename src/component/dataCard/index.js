import React from 'react'
import styles from './index.module.scss';
import {ReactComponent as UpIcon} from '../../asset/up_icon.svg'
import {ReactComponent as DownIcon} from '../../asset/down_icon.svg'

export default function DataTable({list_data}) {
    const company_etf_list_data = list_data 
  return (
    <div className={styles.card_list}>
        {company_etf_list_data && company_etf_list_data.map((item,index)=>{
            const lastest_worth_time = item.i.slice(0,4)+ '/' + item.i.slice(4,6)+ '/'+item.i.slice(6,8)+ '-' + item.j
            const overPrice = item.g > 0
            return(
            <div key={item.a} className={styles.card}>
                <div className={styles.card_header}>
                    <p>{item.a}</p>
                    <p className={styles.etf_name}>{item.b}</p>
                </div>
                <div className={styles.card_row}>
                    <div className={styles.card_row_item}>
                        <p>目前成交價</p>
                        <h4>{item.e}</h4>
                    </div>
                    <div className={styles.card_row_item}>
                        <p>預估淨值</p>
                        <h4>{item.f}</h4>
                    </div>
                    <div className={styles.card_row_item}>
                        <p>折益價</p>
                        {overPrice ?
                            <p className={styles.overPrice}><UpIcon/>{item.g}%</p>
                        :
                            <p className={styles.belowPrice}><DownIcon/>{item.g}%</p>
                        }
                    </div>
                </div>
                <h6 className={styles.card_lastest_time}>{lastest_worth_time}</h6>
            </div>
            )
        })}
      
    </div>
  )
}
