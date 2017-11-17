import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchHospitals, fetchHospital, fetchRoomsAt, fetchBedsAt, fetchFreeBedsAt } from '../../../actions';

//components
import BackToList from '../../../components/backToList';
import Table from '../../../components/Table';

class HospitalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            freeBedCnt: 0
        }
    }
    componentDidMount() {
        const { _id } = this.props.match.params;
        this.props.fetchHospital(_id);
        if (!this.props.hospitals) {
            this.props.fetchHospitals();
        }
    }
    componentDidUpdate() {
        if (!this.props.rooms_at) {
            const { floor } = this.props.match.params;
            if (floor) {
                this.props.fetchRoomsAt(floor);
            }
        }
        if (!this.props.beds_at) {
            const { room } = this.props.match.params;
            if (room) {
                this.props.fetchBedsAt(room);
            }
        }
    }
    backRoute(){
        let path = [{ route: "/monitor", comment: "Monitor"}];
        
        const { _id } = this.props.match.params;
        const { floor } = this.props.match.params;
        const { room } = this.props.match.params;
        
        if (floor) {
            path.push({route: `/monitor/hospital=${_id}`, comment: `${floor.number} floor`});
        }
        if (room) {
            path.push({route: `/monitor/hospital=${_id}/floor=${floor}`, comment: `Room No.${room.number}`});
        }
        return path;
        /* let path = ["/","Hospitals"];
        const { _id } = this.props.match.params;
        const { floor } = this.props.match.params;
        const { room } = this.props.match.params;
        if (room) {
            path[0] = `/hospital=${_id}/floor=${floor}`;
            path[1] = "Rooms";
        }
        else if (floor) {
            path[0] = `/hospital=${_id}`;
            path[1] = "Floors"
        }
        console.log(path);
        return path; */
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
    getFreeRooms(room) {
        // map room bed list _patient
        // if _patient is undefined count up
        // return the count 
        let cnt = 0;
        let freeRooms =  _.map(room._bed_list, bed => {
            if(!bed._patient){
                return ++cnt;
            }
        });
        freeRooms = freeRooms[room._bed_list.length-1];
        if(!freeRooms){ freeRooms = 0;}
        return freeRooms;
        

    }
    renderRoomsList() {
        let i = 0;
        if (this.props.rooms_at.length === 0) {
            return ;
        }
        return _.map(this.props.rooms_at, room => {
            return (
                <tr key={room._id}>
                    <th scope="row">{++i}</th>
                    <td>Room No.{room.number}</td>
                    <td>{room._bed_list.length}</td>
                    <td>{room._bed_list.length - this.getFreeRooms(room)}</td>
                    <td>{this.getFreeRooms(room)}</td>
                    <td>
                        <Link to={`/monitor/hospital=${this.props.hospital._id}/floor=${room.floor_}/room=${room._id}`} className="btn btn-default">
                            Go
                        </Link>
                    </td>
                </tr>
            );
        });
    }
    renderFloorsList() {
        let i = 0;
        if (this.props.hospital._floor_list.length === 0) {
            return ;
        }
        return _.map(this.props.hospital._floor_list, floor => {
            return (
                <tr key={floor._id}>
                    <th scope="row">{++i}</th>
                    <td>{floor.number} floor</td>
                    <td>{floor._room_list.length}</td>
                    <td><Link to={`/monitor/hospital=${this.props.hospital._id}/floor=${floor._id}`} className="btn btn-default">
                        Go
                    </Link></td>
                </tr>
            );
        });
    }
    renderItemList() {
        let tableHeadRow;
        let tableBody;
        if (this.props.beds_at && this.props.match.params.room) {
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
            tableBody = this.renderPatientsList();
        }
        else if (this.props.rooms_at && this.props.match.params.floor) {
            tableHeadRow = (
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Total Number of Beds</th>
                    <th>The Number of Patients</th>
                    <th>The Number of Free Beds</th>
                    <th>Detail</th>
                </tr>
            );
            tableBody = this.renderRoomsList();
        }
        else {
            tableHeadRow = (
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Total Number of Rooms</th>
                    <th>Detail</th>
                </tr>
            );
            tableBody = this.renderFloorsList();
        }
        
        if (!tableBody || !tableBody[0]) {
            tableBody = (<tr><td colSpan="100%" className="text-center">No result... <BackToList /></td></tr>);
        }
        return (
            <Table tableBody={tableBody} tableHeadRow={tableHeadRow} />
        );
    }
    render() {
        if (!this.props.hospital) {
            return (
                <div>Loading...</div>
            );
        }
        return (
            <div className="table-wrapper">
                <BackToList route={this.backRoute()} />
                <h3 className="text-center">{this.props.hospital.name}</h3>
                {this.renderItemList()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    // console.log("hospitals log", hospitals[ownProps.match.params._id]);
    let tempState = state.hospitals;
    return { hospitals: tempState, hospital: tempState.hospital, rooms_at: tempState.rooms_at, beds_at: tempState.beds_at, free_beds_at: tempState.free_beds_at };
}

export default connect(mapStateToProps, { fetchHospitals, fetchHospital, fetchRoomsAt, fetchBedsAt, fetchFreeBedsAt })(HospitalPage);