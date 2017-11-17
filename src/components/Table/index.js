import React, { Component } from 'react';

class Table extends Component {
    render() {
        let tableHeadRow = this.props.tableHeadRow;
        let tableBody = this.props.tableBody;
        return (
            <table className="table table-responsive" >
                <thead className="mdb-color lighten-4">
                    {tableHeadRow}
                </thead>
                <tbody className="hospital-group">
                    {tableBody}
                </tbody>
            </table>
        );
    }
}
export default Table;