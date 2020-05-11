import React,{Component} from 'react';
import {Pie} from 'react-chartjs-2';
import fetchConfirmedCases from './api';
import axios from 'axios';
import './PieChart.css';
import {Card,CardContent,Typography,Grid,Container} from '@material-ui/core';
import CountUp from 'react-countup';
class PieChart extends Component{
    async componentDidMount(){
        
    }
    generateData(stateNames,cases,backgroundColors){
        const indiaSummary=this.props.indiaSummary;
        console.log(indiaSummary[0]);
        let labels1=[];
        let confirmed=[];
        for(let i=0;i<stateNames.length;i++){
            confirmed.push(cases[i]);
            labels1.push(stateNames[i]);
            //backgroundColor1.push(this.getRandomColor());
        }
        const options={
            maintainAspectRatio: false,
            responsive: true,
            labels:labels1,
            legend: {
                position: 'left',
                display:false,
                labels: {
                  boxWidth: 10
                }
              },
            datasets:[{
                data:confirmed,
                backgroundColor:backgroundColors
            }]
        };
        return options;
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    add(accumulator,a){
        return accumulator+a;
    }
    render(){
        const indiaSummary=this.props.indiaSummary;
        const stateNames=indiaSummary.map(stateData=>stateData.state);
        const confirmedCases=indiaSummary.map(stateData=>stateData.confirmed);
        const recoveredCases=indiaSummary.map(stateData=>stateData.recovered);
        const deathCases=indiaSummary.map(stateData=>stateData.deaths);
        const backgroundColors=indiaSummary.map(stateData=>this.getRandomColor());
        const optionsConfirmed=this.generateData(stateNames,confirmedCases,backgroundColors)
        const optionsRecovered=this.generateData(stateNames,recoveredCases,backgroundColors)
        const optionsDeaths=this.generateData(stateNames,deathCases,backgroundColors)
        const totalConfirmed=confirmedCases.reduce(this.add,0);
        const totalDeaths=deathCases.reduce(this.add,0);
        const totalRecovered=recoveredCases.reduce(this.add,0);
        //fetchConfirmedCases();
        return(
        <div className="pieChart">
           
        <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3}className="card infected">
                    <CardContent>
                    <Container maxWidth="sm">
                        <Typography color="textSecondary" gutterBottom>Total Infected</Typography>
                        <Typography variant="h5">
                                            <CountUp start={0} end={totalConfirmed} duration={2.5} separator=","/>
                                            </Typography>
                        
                        <Pie data={optionsConfirmed} height={200} width={200} options={
                                {legend:{
                                    display:false,
                                },}
                            }/>
                        
                        </Container>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className="card recovered">
                    <CardContent>
                    <Container maxWidth="sm">
                        <Typography color="textSecondary" gutterBottom>Total Recovered</Typography>
                        <Typography variant="h5">
                                            <CountUp start={0} end={totalRecovered} duration={2.5} separator=","/>
                                            </Typography>
                        <Pie data={optionsRecovered} height={200} width={200} options={
                                {legend:{
                                    display:false,
                                },}
                            }/>
                        </Container>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className="card deaths">
                    <CardContent>
                    <Container maxWidth="sm">
                    <Typography color="textSecondary" gutterBottom>Total Deaths</Typography>
                    <Typography variant="h5">
                                        <CountUp start={0} end={totalDeaths} duration={2.5} separator=","/>
                                        </Typography>
                    <Pie data={optionsDeaths} height={200} width={200} options={
                            {legend:{
                                display:false,
                            },}
                        }/>
                    </Container>
                        
                    </CardContent>
                </Grid>
            </Grid>
        
        
           </div>
        );
        
    }
}
export default PieChart;