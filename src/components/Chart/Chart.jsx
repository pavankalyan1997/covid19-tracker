import React,{ Component} from 'react';
import {Line,Bar} from 'react-chartjs-2';
import './Chart.css';
import Axios from 'axios';
class Chart extends Component{
    
    state={
        dailyData:[]
    }
    async componentDidMount(){
        const {data}=await Axios.get('https://covid19.mathdro.id/api/daily');
            this.setState({
                dailyData:data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }))
            })
    }
    

    
    LineChart(){
        const dailyData=this.state.dailyData;
        const confirmed=dailyData.map(x=>x.confirmed);
        console.log(confirmed);
        const lineChart=(
            dailyData.length?(<Line 
                data={{
                    labels:dailyData.map(({date})=>date),
                    datasets:[{
                        data:confirmed,
                        label:'Infected',
                        borderColor:'#3333ff',
                        fill:true
                    },{
                        data:dailyData.map(({deaths})=>deaths),
                        label:'Deaths',
                        borderColor:'red',
                        backgroundColor:'rgba(255,0,0,0.5)',
                        fill:true
                    }]
                }}
            />):null
        );
        return lineChart;
    }
    BarChart(){
        const {confirmed,recovered,deaths}=this.props.data;
        console.log(this.props.data);
        const barChart=confirmed?(<Bar
        data={{
            labels:['Infected','Recovered','Deaths'],
            datasets:[{
                label:'People',
                backgroundColor:['rgba(255,0,0,0.5)','rgba(0,255,0,0.5)','rgba(0,0,255,0.5)'],
                data:[confirmed.value,recovered.value,deaths.value]
            }]
        }}
        options={{
            legend:{display:false},
            title:{display:true,text:`Current State in ${this.props.country}`}
        }}
        />):null;
        
        return barChart;
    }
    
    render(){
        let country=this.props.country;
        // if(country==='Global'){
        //     country='';
        // }
        if(country==='Global'){
            return <div></div>
        }
        return(
            <div className="chartContainer">
                
                {country ?this.BarChart():this.LineChart()}
            </div>
        )
    }
        
    
    
}
export default Chart;