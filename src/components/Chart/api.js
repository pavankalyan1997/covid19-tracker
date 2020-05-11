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
export const fetchConfirmedCases=async()=>{
    let countriesData=[]
    try {
        const url='https://covid19.mathdro.id/api/countries';
        const {data:{countries}}=await axios.get(url);
        const fetchedCountries=countries.map(({name})=>name);
        for(let i=0;i<fetchedCountries.length;i++){
            const data=await axios.get(`https://covid19.mathdro.id/api/countries/${fetchedCountries[i]}`);
            countriesData.push({
                name:fetchedCountries[i],
                confirmed:data.confirmed.value,
                deaths:data.deaths.value,
                recovered:data.recovered.value
            })
        }
        console.log(countriesData);
        
    } catch (error) {
        
    }
}