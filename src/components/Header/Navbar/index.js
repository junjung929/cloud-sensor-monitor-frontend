import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../../containers/SearchBar';

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <div className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">Cloud Sensor Monitor</a>
                </div>   
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home<span className="sr-only">(current)</span></Link></li>
                        <li><Link to="/monitor">Monitor</Link></li>
                    </ul>
                    <SearchBar classNameForm={'input-group navbar-form navbar-left'} />
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">EN/FI</a>
                            <ul className="dropdown-menu">
                                <li><a href="#">ENGLISH</a></li>
                                <li><a href="#">FINNISH</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    );
  }
}