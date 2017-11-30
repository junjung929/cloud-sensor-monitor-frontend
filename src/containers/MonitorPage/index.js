import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'react-loading-indicator';
import { fetchHospitals } from '../../actions';

import Table from '../../components/Table';

class MonitorPage extends Component {
    componentDidMount() {
        this.props.fetchHospitals();
        console.log("Monitor page mounted");
    }
    componentDidUpdate() {
        
    }
    renderHospitals() {
        let i = 0;
        let hospitalImgStyle = {
            borderTop: "1px solid black",
            height: "auto"
        }
        return _.map(this.props.hospitals, hospital => {
            i++;
            if(!hospital){
                return(
                    <tr key={`ran${i}`}><td colSpan="100%"><LoadingIndicator /></td></tr>
                )
            }
            return (
                <tr key={`${hospital._id}-${i}`} >

                    <th scope="row">{i}</th>
                    <td>{hospital.name}</td>
                    <td>{hospital.address}</td>
                    <td>{hospital.phone_number}</td>
                    <td>
                        <Link className="hospital-group-item btn btn-default"
                            to={`/monitor/hospital=${hospital._id}`}>
                            Go
                        </Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        let tableHeadRow = (
        <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Address</th>
            <th>Tel</th>
            <th>Detail</th>
        </tr>
        );
        let tableBody = (
            this.renderHospitals()
        );
        if (!this.props.hospitals) {
            return (
                <div className="text-center">
                    <LoadingIndicator />
                </div>
            );
        }
        return (
            <div>
                <h3 className="text-center">Hospitals</h3>
                <Table tableHeadRow={tableHeadRow} tableBody={tableBody} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { hospitals: state.hospitals };
}

export default connect(mapStateToProps, { fetchHospitals })(MonitorPage);