import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../../actions';

import Table from "../../../components/Table";
import BackToList from '../../../components/backToList';
import Sensor from './Sensor';
class PatientDataPage extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount() {
        let { _id } = this.props.match.params;
        this.props.fetchPatient(_id);
    }
    componentDidUpdate(){
    }
    renderPatient() {
        let patient = this.props.patient;
        let dateFormat = require('dateformat');
        let birth = dateFormat(patient.birth, "yyyy-mm-dd");
        let enter_date = dateFormat(patient.enter_day, "yyyy-mm-dd");
        let leave_date = dateFormat(patient.leave_day, "yyyy-mm-dd"); 
        
        let tableHeadRow = (
            <tr>
                <th>Name</th>
                <th>Tel</th>
                <th>Birthday</th>
                <th>Enter Date</th>
                <th>Leave Date</th>
                <th>Hospital</th>
                <th>Room</th>
            </tr>
        );
        let tableBody = (
            <tr>
                <th scope="row">{patient.first_name} {patient.last_name}</th>
                <td>{patient.phone_number}</td>
                <td>{birth}</td>
                <td>{enter_date}</td>
                <td>{leave_date}</td>
                <td>{patient.hospital_.name}</td>
                <td>No.{patient.room_.number}</td>
            </tr>
        );
        return (
            <div>
                <h3 className="text-center">Patient Detail</h3>
                <Table tableHeadRow={tableHeadRow} tableBody={tableBody} />
                <h4>Sensor Table</h4>
                <Sensor ip={patient.bed_.sensor_ip} patient_name={patient.first_name}/>
            </div>
        );
    }
    render() { 
        if(!this.props.patient){return (<div>No result... <BackToList /></div>)}
        return (
            <div className="table-wrapper">
                <BackToList />
                {this.renderPatient()}
            </div>
        );
    }
}
function mapStateToProps({ patients }, ownProps) {
    return {patient: patients[ownProps.match.params._id]};
}

export default connect(mapStateToProps, { fetchPatient })(PatientDataPage);