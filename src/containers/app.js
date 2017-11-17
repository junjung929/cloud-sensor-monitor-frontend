import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Carousel from '../components/Carousel';
import SearchBar from './SearchBar';
import HomePage from './HomePage';
import MonitorPage from './MonitorPage';
import HospitalPage from './MonitorPage/HospitalPage';
import PatientPage from './MonitorPage/PatientPage';
import SearchResultPage from './MonitorPage/SearchResultPage';
import Footer from '../components/Footer';

export default class App extends Component {
  render() {
      let mainContainerDiv = {
            paddingLeft: 8+"%",
            paddingRight: 8+"%",
            backgroundColor: "#fff",
            paddingTop: "20px",
            paddingBottom: "20px"
        }
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Carousel />
                    <div className="container" style={ mainContainerDiv }>
                        <SearchBar classNameForm={'input-group main-search-bar'} classNameSpan={'input-group-btn'}/>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/monitor/patient=:_id" component={PatientPage} />
                            <Route path="/monitor/search=:searchByName" component={SearchResultPage} />
                            <Route path="/monitor/hospital=:_id/floor=:floor/room=:room" component={HospitalPage} />
                            <Route path="/monitor/hospital=:_id/floor=:floor" component={HospitalPage} />
                            <Route path="/monitor/hospital=:_id" component={HospitalPage} />
                            <Route path="/monitor" component={MonitorPage} />
                            <Route path="" component={HomePage} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    );
  }
}
