import React,{Component} from 'react';
import {NativeSelect,FormControl} from '@material-ui/core';
import './CountryPicker.css';
import Axios from 'axios';
class CountryPicker extends Component{
    state={
        countries:[]
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
            <div className="container">
                <FormControl className="formControl">
                    <NativeSelect defaultValue="" onChange={(e)=>this.props.handleCountryChange(e.target.value)}>
                        <option value="Global">Global</option>
                        {countries.map((name)=>
                        <option key={name} value={name}>{name}</option>)}
                    </NativeSelect>
                </FormControl>
            </div>
            
        )
    }
    
}
export default CountryPicker;