import React, { Component } from 'react';
import {Cards,Chart,CountryPicker} from './components';
import   './App.css';
import {fetchData,fetchDailyData} from './api';
import coronaImage from './images/covid.png';
import PieChart from './components/Chart/PieChart';
import axios from 'axios';
import {Typography} from '@material-ui/core';
class App extends Component {
  state={
    data:{},
    country:'Global',
    globalData:{},
    indiaDetailed:[],
    indiaSummary:[]
  }
  async componentDidMount(){
    const fetchedData=await fetchData();
    let indiaData=[];
        let indiaSummaryWithDistricts=[];
        try {
            const url='https://api.covid19india.org/state_district_wise.json';
            const {data}=await axios.get(url);
            for(let [key,value] of Object.entries(data)){
                let {districtData,stateCode}=value;
                let confirmed=0,active=0,deaths=0,recovered=0;
                for(let [key1,value1] of Object.entries(districtData)){
                    indiaData.push({
                        state:key,
                        district:key1,
                        confirmed:value1.confirmed,
                        active:value1.active,
                        deaths:value1.deceased,
                        delta:value1.delta,
                        recovered:value1.recovered
                    });
                    confirmed+=value1.confirmed;
                    active+=value1.active;
                    deaths+=value1.deceased;
                    recovered+=value1.recovered;
                }
                indiaSummaryWithDistricts.push({
                    state:key,
                    confirmed:confirmed,
                    active:active,
                    deaths:deaths,
                    recovered:recovered
                })
            }
            console.log(indiaSummaryWithDistricts);
            
        } catch (error) {
            console.log(error);
        }
    this.setState({
      data:fetchedData,
      globalData:fetchedData,
      indiaDetailed:indiaData,
      indiaSummary:indiaSummaryWithDistricts
    })
  }
  handleCountryChange=async (countryName)=>{
    if(countryName==='Global'){
      countryName='';
    }
    console.log(countryName);
    const fetchedData=await fetchData(countryName);
    this.setState({
      country:countryName,
      data:fetchedData
    })
  }
  render() {
    const {data,country,globalData}=this.state;
    const countryWise=country!=='Global'?<Cards data={data}/>:null;
    return (
      <div className="container">
        <img src={coronaImage} className="image" alt="covid-19"/>
        <br/>
        <Typography variant="h4" color="textSecondary" gutterBottom>Global Summary</Typography>
        <Cards data={globalData}/>
        <Typography variant="h5" color="textSecondary" gutterBottom>Global Trend</Typography>
        <Chart data={globalData}/>
        <br/>
        <Typography variant="h5" color="textSecondary" gutterBottom>Country Wise Summary</Typography>
        {/* <p>Choose a country to see country wise data</p> */}
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        {countryWise}
        <Chart data={data} country={country}/>
        <Typography variant="h5" color="textSecondary" gutterBottom>India States Summary</Typography>
        <br/>
        <PieChart indiaSummary={this.state.indiaSummary}/>
        
      </div>
    );
  }
}

export default App;
