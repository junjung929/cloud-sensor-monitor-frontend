import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'react-loading-indicator';
import { fetchRoomsAt, fetchFloor } from '../../../actions';

//components
import BackToList from '../../../components/backToList';
import Table from '../../../components/Table';

class FloorPage extends Component {
    componentDidMount() {
        console.log("Floor page mounted");
        const { floor } = this.props.match.params;
        if (floor) {
            this.props.fetchRoomsAt(floor);
            this.props.fetchFloor(floor);
        }
    }
    backRoute(){
        let path = [{ route: "/monitor", comment: "Monitor"}];
        
        const { _id } = this.props.match.params;
        const { floor } = this.props.match.params;
        
        if (floor) {
            path.push({route: `/monitor/hospital=${_id}`, comment: `Floor`});
        }
        return path;
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
        const { _id } = this.props.match.params;
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
                        <Link to={`/monitor/hospital=${_id}/floor=${room.floor_}/room=${room._id}`} className="btn btn-default">
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
        if (this.props.rooms_at) {
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
        
        if (!tableBody || !tableBody[0]) {
            tableBody = (<tr><td colSpan="100%" className="text-center">No result... <BackToList /></td></tr>);
        }
        return (
            <Table tableBody={tableBody} tableHeadRow={tableHeadRow} />
        );
    }
    render() {
        if (!this.props.rooms_at || !this.props.floor) {
            return (
                <div className="text-center">
                    <LoadingIndicator />
                </div>
            );
        }
        return (
            <div className="table-wrapper">
                <BackToList route={this.backRoute()} /><div className="btn btn-primary active">{this.props.floor.number}</div>
                <h3 className="text-center">{this.props.floor.number} Floor</h3>
                {this.renderItemList()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    // console.log("hospitals log", hospitals[ownProps.match.params._id]);
    let tempState = state.hospitals;
    return { rooms_at: tempState.rooms_at, floor: tempState.floor };
}

export default connect(mapStateToProps, { fetchRoomsAt, fetchFloor })(FloorPage);