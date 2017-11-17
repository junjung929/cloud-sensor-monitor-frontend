import React, { Component } from 'react';

class PatientTable extends Component {
    renderThead() {
        return (
        <thead>     
            <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Room</th>
                <th scope="col">Hospital</th>
            </tr>
        </thead>
        );
    }
    renderTbody() {
        return (
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        );
    }
    renderTfoot() {
        return (
            <tfoot>
                <tr>
                    <td></td>
                </tr>
            </tfoot>
        );
    }
    render() {
        if(!this.props.data){return (<div />)}
        console.log(this.props.data);
        return (
            <table className="table">
                {this.renderThead()}
                {this.renderTbody()}
            </table>
          );
    }
}
export default PatientTable