import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPatient } from '../../actions';
import { Link, Redirect } from 'react-router-dom';

import PatientPage from '../MonitorPage/PatientPage';

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state={ term: '' };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();

        // this.props.fetchPatient(this.state.term);
        this.setState({ term: '' });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className={`${this.props.classNameForm}`}>
                    <input 
                        placeholder="Search with patient's name"
                        className="form-control"
                        value={this.state.term}
                        onChange={this.onInputChange} />
                    <span className={`${this.props.classNameSpan}`}>
                        <Link to={`/monitor/search=${this.state.term}`} onClick={() => this.setState({ term: ''})}>
                            <button type="submit" className="btn btn-secondary">Search</button>
                        </Link>
                    </span>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchPatient }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);