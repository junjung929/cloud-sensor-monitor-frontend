import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'react-loading-indicator';
import { fetchBedsAt, fetchRoom } from '../../../actions';

//components
import BackToList from '../../../components/backToList';
import Table from '../../../components/Table';

class RoomPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            freeBedCnt: 0
        }
    }
    componentDidMount() {
        console.log("Room mounted");
        const { room } = this.props.match.params;
        if (room) {
            this.props.fetchBedsAt(room);
            this.props.fetchRoom(room);
        }
    }
    componentDidUpdate() {
    }
    componentWillUnmount() {
        console.log("Room unmounted");
    }
    backRoute(){
        let path = [{ route: "/monitor", comment: "Monitor"}];
        
        const { _id } = this.props.match.params;
        const { floor } = this.props.match.params;
        const { room } = this.props.match.params;
        
        if (floor) {
            path.push({route: `/monitor/hospital=${_id}`, comment: `Floor`});
        }
        if (room) {
            path.push({route: `/monitor/hospital=${_id}/floor=${floor}`, comment: `Room`});
        }
        return path;
    }
    renderPatientsList() {
        let i = 0;
        if (this.props.beds_at.length === 0) {
            return ;
        }
        return _.map(this.props.beds_at, bed => {
            let patient = bed._patient;
            if (!patient) {
                if (i === 0) { return ; }
                return (<tr key={bed._id} />);
            }
            let dateFormat = require('dateformat');
            let birth = dateFormat(patient.birth, "yyyy-mm-dd");
            let enter_date = dateFormat(patient.enter_day, "yyyy-mm-dd");
            let leave_date = dateFormat(patient.leave_day, "yyyy-mm-dd");
            return (
                <tr key={bed._id}>
                    <th scope="row">{++i}</th>
                    <td>{patient.first_name} {patient.last_name}</td>
                    <td>{patient.phone_number}</td>
                    <td>{birth}</td>
                    <td>{enter_date}</td>
                    <td>{leave_date}</td>
                    <td>
                        <Link to={`/monitor/patient=${patient._id}`} className="btn btn-default">
                            Go
                        </Link>
                    </td>
                </tr>
            );
        });
    }
    renderItemList() {
        let tableHeadRow;
        let tableBody;
        tableHeadRow = (
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Tel</th>
                <th>Birthday</th>
                <th>Enter Date</th>
                <th>Leave Date</th>
                <th>Detail</th>
            </tr>
        );
        if(!this.props.beds_at){
            tableBody = (<tr><td colSpan="100%" className="text-center"><LoadingIndicator /></td></tr>);
            
            return (
                <Table tableBody={tableBody} tableHeadRow={tableHeadRow} />
            );
        }
        
        
        tableBody = this.renderPatientsList();
        if (!tableBody || !tableBody[0]) {
            tableBody = (<tr><td colSpan="100%" className="text-center">No result... <BackToList /></td></tr>);
        }
        
        return (
            <Table tableBody={tableBody} tableHeadRow={tableHeadRow} />
        );
        
    }
    render() {
        if (!this.props.beds_at || !this.props.room) {
            return (
                <div className="text-center">
                    <LoadingIndicator />
                </div>
            );
        }
        return (
            <div className="table-wrapper">
                <BackToList route={this.backRoute()} /><div className="btn btn-primary active">{this.props.room.number}</div>
                <h3 className="text-center">Room No.{this.props.room.number}</h3>
                {this.renderItemList()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    // console.log("hospitals log", hospitals[ownProps.match.params._id]);
    let tempState = state.hospitals;
    return { beds_at: tempState.beds_at, room: tempState.room };
}

export default connect(mapStateToProps, { fetchBedsAt, fetchRoom })(RoomPage);