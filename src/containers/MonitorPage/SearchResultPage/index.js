import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPatientsSearched, fetchPatientsSearchedHospital } from '../../../actions';

import Table from '../../../components/Table';
import BackToList from '../../../components/backToList';

class PatientDataPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchByName: null,
            countResult: 0
        }
        this.onCountResult = this.onCountResult.bind(this, false);
    }
    componentDidMount() {
        let { searchByName } = this.props.match.params;
        this.props.fetchPatientsSearched(searchByName);
        this.setState({searchByName});
        this.onCountResult()
    }
    componentDidUpdate(){
        let { searchByName } = this.props.match.params;
        // if new search keyword is different with current keyword
        if(this.state.searchByName != searchByName) {
            // fetch the data again
            this.props.fetchPatientsSearched(searchByName);
            // set new value as current keyword
            this.setState({searchByName});
        }
        this.onCountResult()
        
    }
    
    onCountResult() {
        if(this.props.patients_searched ){
            let countResult = this.props.patients_searched.length;
            if(countResult != this.state.countResult){
                this.setState({countResult});
            }
        }
    }
    renderPatient() {    
        
        let i = 0;
        if(!this.props.patients_searched) {
            if (i === 0) { return ; }
            return ;
        }
        if (this.props.patients_searched.length === 0) {
            return ;
        }
        return _.map(this.props.patients_searched, patient =>{
            let dateFormat = require('dateformat');
            let birth = dateFormat(patient.birth, "yyyy-mm-dd");
            let enter_date = dateFormat(patient.enter_day, "yyyy-mm-dd");
            let leave_date = dateFormat(patient.leave_day, "yyyy-mm-dd");
            return (
                <tr key={patient._id}>
                    <th scope="row">{++i}</th>
                    <td>{patient.first_name} {patient.last_name}</td>
                    <td>{patient.phone_number}</td>
                    <td>{birth}</td>
                    <td>{enter_date}</td>
                    <td>{leave_date}</td>
                    <td>{patient.hospital_.name}</td>
                    <td>
                        <Link to={`/monitor/patient=${patient._id}`} className="btn btn-default">
                            Go
                        </Link>
                    </td>
                </tr>
            );
        });
    }
    render() { 
        let tableHeadRow = (
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Tel</th>
                <th>Birthday</th>
                <th>Enter Date</th>
                <th>Leave Date</th>
                <th>Hospital</th>
                <th></th>
            </tr>
        );
        let tableBody = this.renderPatient();
        if (!tableBody || !tableBody[0]) {
            tableBody = (<tr><td colSpan="100%" className="text-center">No result... <BackToList /></td></tr>);
        }
        /* 
        if(this.state.countResult == 0){
            return (<p colSpan="100%" className="text-center">No result... <BackToList /></p>);
        }    */
        return (
            <div>
                <BackToList />
                <h3>Result of '{this.state.searchByName}'</h3>
                <Table tableHeadRow={tableHeadRow} tableBody={tableBody}/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { patients_searched: state.patients.patients_searched };
}

export default connect(mapStateToProps, { fetchPatientsSearched, fetchPatientsSearchedHospital })(PatientDataPage);