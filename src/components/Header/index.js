import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import HeaderSpace from '../HeaderSpace';

class Header extends Component {
    render() {
        return (
            <div>
                <div id="header" className="header-wrap navbar-fixed-top">
                
                    <div className="container">
                        <Navbar />
                    
                    </div>
                </div>
                <HeaderSpace />
            </div>
            
        );
    }
}
export default Header;