import axios from 'axios';
const url="https://covid19.mathdro.id/api";
export const fetchDailyData=async()=>{
    try {
        console.log("It came here");
    const {data}=await axios.get(`${url}/daily`);
    console.log(data);
    return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
        
    }
    

}