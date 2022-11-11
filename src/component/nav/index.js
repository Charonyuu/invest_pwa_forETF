import React, { useState } from 'react'
import styles from './index.module.scss'
import useFetchData from '../../hooks/useFetchData';
import { ReactComponent as RefreshIcon } from '../../asset/refresh_icon.svg'
import { ReactComponent as HeartIcon } from '../../asset/favorite_icon.svg'
import { ReactComponent as PercentIcon } from '../../asset/percent_icon.svg'
import { ReactComponent as CancelIcon } from '../../asset/cancel_icon.svg'

export default function Nav({search,setSearch}) {
    const {FetchData} = useFetchData()
    const [isRefresh,setIsRefresh] = useState(false)
    const refresh_hanlder = () =>{
        setIsRefresh(true)
        FetchData();
    }
  return (
    <div className={styles.navbar}>
        <div className={styles.input}>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='輸入代碼或名稱'/>
            {search && <CancelIcon onClick={()=>setSearch('')}/>}
        </div>
        <div className={styles.btn_group}>
            <div onClick={refresh_hanlder} className={styles.icon}>
            <HeartIcon />
            </div>
            <div onClick={refresh_hanlder} className={styles.icon}>
            <PercentIcon />
            </div>
            <div onClick={refresh_hanlder} className={styles.icon}>
                <RefreshIcon className={isRefresh ? styles.refreshing : null} onAnimationEnd={()=> setIsRefresh(false)}/>
            </div>
        </div>
    </div>
  )
}
