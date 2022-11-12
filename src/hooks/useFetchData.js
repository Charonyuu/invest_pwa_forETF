import { useEffect, useState } from 'react';
import axios from 'axios';
import { INVEST_ETF_WORTHS_BASE_URL} from '../constant/api';
export default function useFetchData(){

    const [data,setData] = useState();
    const [loading,setLoading] = useState(true);
    const [error,setError] =useState('')
    const Isopen_hour = () =>{
        const day = new Date().getDay();
        const time = new Date().getHours(); 
        return day > 0 && day < 6 && time >=9 && time <=16;
    }
    const FetchData = (async()=>{
        await axios.get(INVEST_ETF_WORTHS_BASE_URL)
        .then((response)=>{
            setData(response.data);
            setLoading(false)
        }).catch((err)=>{
            console.log('error:' + err);
            setError(err.toString())
        })
    })
    useEffect(()=>{
        setLoading(true)
        FetchData();
        if (!Isopen_hour())return;
        const get_data_interval = setInterval(()=>{
            FetchData();
        },15000)
        return () => clearInterval(get_data_interval);
    },[])
    return {data , loading , error , FetchData}
}
