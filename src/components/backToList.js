import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* export default (props) => {
    return (
        <Link to={`/monitor${props.route[0]}`}>Back to {props.route[1]} List</Link>
    );
} */
class BackToList extends Component {
    onBackToList() {
        return _.map(this.props.route, path => {
            console.log("--------------------");
            console.log(path);
            if(!path) {
                return;
            }
            return (
                <Link to={`${path.route}`}><span className="temp">/</span>{`${path.comment}`}</Link>
            );
        });
    }
    render() {
            return <div>{this.onBackToList()}</div>
    }
}
export  default BackToList;