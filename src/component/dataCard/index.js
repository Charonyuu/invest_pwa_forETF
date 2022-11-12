import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import {ReactComponent as UpIcon} from '../../asset/up_icon.svg'
import {ReactComponent as DownIcon} from '../../asset/down_icon.svg'
import {ReactComponent as HeartIcon} from '../../asset/heart_icon.svg'
import classnames from "classnames";


export default function DataTable({filter,toggle,list_data,option}) {
    const company_etf_list_data = list_data
    const [checked,setChecked] = useState([])
    useEffect(()=>{
        const localStorage_data = JSON.parse(localStorage.getItem('ETF_Favorite_Data')) || [];
        setChecked(localStorage_data)
    },[])

    const checked_handler = (ETF_number) => { 
        const localStorage_data = JSON.parse(localStorage.getItem('ETF_Favorite_Data')) || [];
        const temp = [...localStorage_data]
        console.log(temp);
        const if_in_storage = temp.findIndex(nums => nums === ETF_number)
        console.log(if_in_storage);
        if(if_in_storage === -1){
            temp.push(ETF_number)
        }else{
            temp.splice(if_in_storage,1)
        }
        setChecked(temp); 
        localStorage.setItem('ETF_Favorite_Data',JSON.stringify(temp))
    }; 

    const Show_or_Hide = (item) =>{  //卡片顯示或隱藏的return function
        if ((!filter) && (!toggle) && option==='all') return styles.show;
        if (option === 'percent'){
            const percent_result = item.g <= -1 || item.g >= 1
            if (!percent_result) return styles.fadeOut
            return styles.fadeIn
        }
        if (option === 'favorite'){
            const favorite_result = checked.find(nums => nums === item.a)
            if (!favorite_result) return styles.fadeOut
            return styles.show
        }
        if (filter) {
            const filter_result = item.a.toString().search(filter) !== -1 || item.b.toString().search(filter) !== -1
            if (filter_result) {
                return styles.show
            }else{
                return styles.fadeOut
            }
        }
        if(toggle) return styles.hide
    }

  return (
    <div className={styles.card_list}>
        {company_etf_list_data && company_etf_list_data.map((item,index)=>{
            const lastest_worth_time = item.i.slice(0,4)+ '/' + item.i.slice(4,6)+ '/'+item.i.slice(6,8)+ '-' + item.j //更新時間
            const overPrice = item.g > 0 //超過淨值
            return(
            <div key={item.a} className={classnames(styles.card,Show_or_Hide(item))}>
                <div className={styles.card_header}>
                    <h4>{item.a}</h4>
                    <p className={styles.etf_name}>{item.b}</p>
                </div>
                <div className={styles.card_row}>
                   
                    <div className={styles.card_row_item}>
                        <p>目前成交價</p>
                        <h4 style={{color : overPrice ? 'red' : 'green',textDecoration:'underline'}} >{item.e.toString().slice(0,5)}</h4>
                    </div>
                    <div className={styles.card_row_item}>
                        <p>預估淨值</p>
                        <h4>{item.f.toString().slice(0,5)}</h4>
                    </div>
                    <div className={styles.card_row_item}>
                        <p>折益價</p>
                        {overPrice ?
                            <p className={styles.overPrice}><UpIcon/>{item.g.toString().slice(0,4)}%</p>
                        :
                            <p className={styles.belowPrice}><DownIcon/>{item.g.toString().slice(0,5)}%</p>
                        }
                    </div>
                </div>
                <HeartIcon className={classnames(styles.heart,{[styles.red]:checked.find(nums=> nums === item.a )})} onClick={() =>checked_handler(item.a)} />
                <h6 className={styles.card_lastest_time}>{lastest_worth_time}</h6>
            </div>
            )
        })}
      
    </div>
  )
}
