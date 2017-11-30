import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'react-loading-indicator';
import { fetchHospitals, fetchHospital, fetchRoomsAt, fetchBedsAt, fetchFreeBedsAt } from '../../../actions';

//components
import BackToList from '../../../components/backToList';
import Table from '../../../components/Table';

class HospitalPage extends Component {
    componentDidMount() {
        console.log("Hospital page mounted");
        const { _id } = this.props.match.params;
        this.props.fetchHospital(_id);
        if (!this.props.hospitals) {
            this.props.fetchHospitals();
        }
    }
    backRoute(){
        let path = [{ route: "/monitor", comment: "Monitor"}];
        return path;
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
        tableHeadRow = (
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Total Number of Rooms</th>
                <th>Detail</th>
            </tr>
        );
        tableBody = this.renderFloorsList();
        
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
                <div className="text-center">
                    <LoadingIndicator />
                </div>
            );
        }
        return (
            <div className="table-wrapper">
                <BackToList route={this.backRoute()} /><div className="btn btn-primary active">{this.props.hospital.name}</div>
                <h3 className="text-center">{this.props.hospital.name}</h3>
                {this.renderItemList()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    // console.log("hospitals log", hospitals[ownProps.match.params._id]);
    let tempState = state.hospitals;
    return { hospitals: tempState, hospital: tempState.hospital };
}

export default connect(mapStateToProps, { fetchHospitals, fetchHospital })(HospitalPage);