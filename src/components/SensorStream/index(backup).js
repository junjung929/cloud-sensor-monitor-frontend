import _ from 'lodash';
import React, { Component } from 'react';
import Table from '../Table';
import ReactHighstrock from 'react-highcharts/ReactHighstock';
class SensorStream extends Component {
    constructor(props) {
        super(props);
        const date = new Date().getTime()

        this.state = {
            sensorData: [],
            sensorGraph: {
                time: [[date]],
                HR: [[date,0]], //heartRate
                RR: [[date,0]], //respirationRate
                SV: [[date,0]], //relativeStrokeVolume
                HRV: [[date,0]], //heartRateVariability
                signalStrength: [[date,0]], // measured signal strength indication 
                status: [[date,0]],
                B2B: [[date,0]], //beat2beat time
                B2B1: [[date,0]], //beat2beat time
                B2B2: [[date,0]] //beat2beat time
            },
        }
    }
    componentWillMount() {
        let url = "10.94.71.86";
        let port = 8000;
        this.ws = new WebSocket(`ws://${url}:${port}/websocket`);

        
    }
    componentDidMount() {
        let { sensorData, sensorGraph } = this.state;
        let sensorIp = '10.94.71.23';
        this.ws.onopen = () => {
            this.ws.send(sensorIp);
            console.log("opened socket");
        }
            this.ws.onmessage = msg => {
                let i = 0;
                sensorData = msg.data.split(",");
                this.setState({ sensorData });
                let date = new Date().getTime()
                sensorGraph.time.push([date, parseInt(sensorData[i++])]);
                sensorGraph.HR.push([date, parseInt(sensorData[i++])])
                sensorGraph.RR.push([date, parseInt(sensorData[i++])])
                sensorGraph.SV.push([date, parseInt(sensorData[i++])])
                sensorGraph.HRV.push([date, parseInt(sensorData[i++])])
                sensorGraph.signalStrength.push([date, parseInt(sensorData[i++])])
                sensorGraph.status.push([date, parseInt(sensorData[i++])])
                sensorGraph.B2B.push([date, parseInt(sensorData[i++])])
                sensorGraph.B2B1.push([date, parseInt(sensorData[i++])])
                sensorGraph.B2B2.push([date, parseInt(sensorData[i++])])
        }
        this.ws.send(sensorIp)
        console.log(sensorIp)
    }
    componentWillUnmount() {
        console.log("unmount")
        
        this.ws.onclose = () => {
            console.log('closed socket')
        }
    }
    renderSensorData() {
        let { sensorData } = this.state;
        let i = 0
        return _.map(sensorData, data => {
            i++;
            if(i>1 && i<7)
            return (<td key={`${i}-${data}`}>{data}</td>)
        });
    }
    renderSensorTable() {
        let { sensorData } = this.state;
        let i = 0;
        let tableHeadRow = (
            <tr>
                <th>Sensor</th>
                <th>Heart rate (bpm)</th>
                <th>Respiration rate (rpm)</th>
                <th>Relative stroke volume (um)</th>
                <th>Heart rate variability (ms)</th>
                <th>Measured signal strength</th>
            </tr>
        )
        let tableBody = (<tr><th scope="row">1</th>{this.renderSensorData()}</tr>);
        return (<Table tableHeadRow={tableHeadRow} tableBody={tableBody} />)
    }
    render() {
        let { sensorData, sensorGraph } = this.state;
        let i = 0
        let config = {
            rangeSelector: {
                selected: 1
            },
            title: {
                text: 'Sensor Graph'
            },

            series: [
                {
                    name: 'Heart Rate',
                    data: sensorGraph.HR,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
                , {
                    name: 'Respiration Rate',
                    data: sensorGraph.RR,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
                , {
                    name: 'Relative Stroke Volume',
                    data: sensorGraph.SV,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
                , {
                    name: 'Heart Rate Variability',
                    data: sensorGraph.HRV,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
                , {
                    name: 'Signal Strength',
                    data: sensorGraph.signalStrength,
                    tooltip: {
                        valueDecimals: 2
                    }
                }/* 
                , {
                    name: 'Status',
                    data: sensorGraph.status,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
                , {
                    name: 'Beat to Beat time',
                    data: sensorGraph.B2B,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
                , {
                    name: 'Beat to Beat time',
                    data: sensorGraph.B2B1,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
                , {
                    name: 'Beat to Beat time',
                    data: sensorGraph.B2B2,
                    tooltip: {
                        valueDecimals: 2
                    }
                } */
            ]
        };
        return (
            <div>
                {this.renderSensorTable()}
                <ReactHighstrock config={config} />
            </div>
        );
    }
}



export default SensorStream;