import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSensorData } from '../../../../actions';

import LoadingIndicator from 'react-loading-indicator';
import Table from "../../../../components/Table";
import BackToList from '../../../../components/backToList';
import SensorStream from '../../../../components/SensorStream';

class Sensor extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchSensorData(this.props.ip);
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
        let { sensor_data } = this.props;
        
        return sensor_data[0];
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