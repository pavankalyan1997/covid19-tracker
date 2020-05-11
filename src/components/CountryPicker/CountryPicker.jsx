import React,{Component} from 'react';
import {NativeSelect,FormControl} from '@material-ui/core';
import './CountryPicker.css';
import Axios from 'axios';
class CountryPicker extends Component{
    state={
        countries:[]
    }
    fetchConfirmedCases=async(countries)=>{
        let countriesData=[]
        try {
            for(let i=0;i<countries.length;i++){
                const data=await Axios.get(`https://covid19.mathdro.id/api/countries/${countries[i]}`);
                console.log(data);
                countriesData.push({
                    name:countries[i],
                    confirmed:data.confirmed.value,
                    deaths:data.deaths.value,
                    recovered:data.recovered.value
                })
            }
            console.log(countriesData);
            
        } catch (error) {
            
        }
    }
    async componentDidMount(){
        const url='https://covid19.mathdro.id/api/countries';
        const {data:{countries}}=await Axios.get(url);
        const fetchedCountries=countries.map(({name})=>name);
        this.setState({
            countries:fetchedCountries
        });
        
    }
    
    render(){
        const countries=this.state.countries;
        return(
            
                <FormControl className="formControl">
                    <NativeSelect defaultValue="" onChange={(e)=>this.props.handleCountryChange(e.target.value)}>
                        <option value="Global">Choose a country</option>
                        {countries.map((name)=>
                        <option key={name} value={name}>{name}</option>)}
                    </NativeSelect>
                </FormControl>
           
            
        )
    }
    
}
export default CountryPicker;