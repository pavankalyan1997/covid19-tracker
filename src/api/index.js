import axios from 'axios';
const url="https://covid19.mathdro.id/api";
export const fetchData=async(countryName)=>{
    let changeableUrl=url;
    if(countryName){
        changeableUrl= `${url}/countries/${countryName}`;
    }
    try{
        const {data:{confirmed,recovered,deaths,lastUpdate}}=await axios.get(changeableUrl);
        
        return {confirmed,recovered,deaths,lastUpdate};
    }catch(error){
        console.log(error);
        return error;
    }
}
export const fetchDailyData=async()=>{
        console.log("It came here");
        const {data}=await axios.get(`${url}/daily`);
        console.log(data);
        return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    
}