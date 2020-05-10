import React, { Component } from 'react';
import {Cards,Chart,CountryPicker} from './components';
import   './App.css';
import {fetchData,fetchDailyData} from './api';
import coronaImage from './images/covid.png';

class App extends Component {
  state={
    data:{},
    country:'Global'
  }
  async componentDidMount(){
    const fetchedData=await fetchData();
    this.setState({
      data:fetchedData
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
    const {data,country}=this.state;
    return (
      <div className="container">
        <img src={coronaImage} className="image" alt="covid-19"/>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
        
      </div>
    );
  }
}

export default App;
