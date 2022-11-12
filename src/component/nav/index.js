import React, { useState } from 'react'
import styles from './index.module.scss'
import useFetchData from '../../hooks/useFetchData';
import classnames from 'classnames';
import { ReactComponent as RefreshIcon } from '../../asset/refresh_icon.svg'
import { ReactComponent as HeartIcon } from '../../asset/favorite_icon.svg'
import { ReactComponent as UpIcon } from '../../asset/up_icon.svg'
import { ReactComponent as CancelIcon } from '../../asset/cancel_icon.svg'

export default function Nav({search,setSearch,option,setOption,toggleList,setToggleList}) {
    const {FetchData} = useFetchData()
    const [allToggle,setAllToggle] = useState(false)
    const [isRefresh,setIsRefresh] = useState(false)
    
    const toggle_handler = () =>{
        const temp = [...toggleList]
        setToggleList(temp.fill(!allToggle))
        setAllToggle(!allToggle)
    }
    const input_handle = (value) =>{
        setSearch(value)
        setOption('all')
    }
    const refresh_hanlder = () =>{
        setIsRefresh(true)
        FetchData();
    }
    const option_handler = (the_option) =>{
        setSearch('')
        if (option  !== the_option) {
            setOption(the_option)
        }else{
            setOption('all')
        }
    }
  return (
    <div className={styles.navbar}>
        <div className={styles.input}>
            <input value={search} onChange={(e)=>input_handle(e.target.value)} placeholder='輸入代碼或名稱'/>
            {search && <CancelIcon onClick={()=>setSearch('')}/>}
        </div>
        <div className={styles.btn_group}>
            <div onClick={() =>option_handler('favorite')} className={classnames(styles.icon,{[styles.be_chosen]:option === 'favorite'})}>
                <HeartIcon />
            </div>
            <div onClick={()=>option_handler('percent')} className={classnames(styles.icon,{[styles.be_chosen]:option === 'percent'})}>
                1%
            </div>
            <div onClick={() =>toggle_handler()} className={classnames(styles.icon,{[styles.down]: allToggle})}>
                <UpIcon />
            </div>
            <div onClick={refresh_hanlder} className={styles.icon}>
                <RefreshIcon className={isRefresh ? styles.refreshing : null} onAnimationEnd={()=> setIsRefresh(false)}/>
            </div>
        </div>
    </div>
  )
}
