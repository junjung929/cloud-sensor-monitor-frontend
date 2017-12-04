import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSensorData } from '../../../../actions';

import LoadingIndicator from 'react-loading-indicator';
import Table from "../../../../components/Table";
import BackToList from '../../../../components/backToList';
import SensorStream from '../../../../components/SensorStream';
import { clearInterval, clearTimeout } from 'timers';

class Sensor extends Component {
    constructor (props) {
        super(props);

        this.state = {
            sensorData: [],
            sensorGraph: {
                HR: [], //heartRate
                RR: [], //respirationRate
                SV: [], //relativeStrokeVolume
                HRV: [], //heartRateVariability
                signalStrength: [], // measured signal strength indication 
                status: [],
                B2B: [], //beat2beat time
                B2B1: [], //beat2beat time
                B2B2: [] //beat2beat time
            }
        }
        this.timer = this.timer.bind(this);
    }
    componentDidMount() {
        // this.props.fetchSensorData(this.props.ip);
        this.timer();
        this._mounted = true;
        // this.intervalId = setInterval(this.timer, 10000);
    }
    componentWillUnmount() {
        this._mounted =false;
        console.log(this._mounted)
    }
    timer = () => {
        this.props.fetchSensorData(this.props.ip)
        .then((err, callback)=>{
            if(!this.props.sensor_data){return}
            let { sensor_data } = this.props
            let { sensorGraph } = this.state;
            sensorGraph.HR.push(sensor_data[0].HR);
            sensorGraph.RR.push(sensor_data[0].RR);
            sensorGraph.SV.push(sensor_data[0].SV);
            sensorGraph.HRV.push(sensor_data[0].HRV);
            sensorGraph.signalStrength.push(sensor_data[0].signalStrength);
            console.log(this._mounted)
            if(this._mounted){
                this.setState({ sensorGraph })
                // console.log(this.state.sensorGraph)
                this.timer();
            }
            
        });
    }
    tableBody() {
        let i = 0;
        if(!this.props.sensor_data){return (<td key={i++} colSpan="100%"><LoadingIndicator /></td>)}
        let { sensor_data } = this.props;
        return _.map(sensor_data, data => {
            return _.map(data, a => {
                if(i>4)return
                return (<td key={i++}>{a[1]}</td>);
            }) 
        })

    }
    chartData() {
        if(!this.props.sensor_data) return null;
        let { sensorGraph } = this.state;
        
        return sensorGraph;
    }
    render() { 
        let tableHeadRow = (
            <tr>
                <th>Name</th>
                <th>Heart rate (bpm)</th>
                <th>Respiration rate (rpm)</th>
                <th>Relative stroke volume (um)</th>
                <th>Heart rate variability (ms)</th>
                <th>Measured signal strength</th>
            </tr>
        )
        let tableBody = (<tr><th scope="row">{this.props.patient_name}</th>{this.tableBody()}</tr>);
        let data= null;
        return (
            <div className="patient-content">
                <Table tableHeadRow={tableHeadRow} tableBody={tableBody} />
                <SensorStream data={this.chartData()} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {sensor_data: state.hospitals.sensor_data};
}

export default connect(mapStateToProps, { fetchSensorData })(Sensor);