import React, { Component } from 'react';

class HeaderSpace extends Component {
    constructor (props) {
        super(props);
        this.state = {
            height: 0
        }
    }
    componentDidMount() {
        const height = document.getElementById('header').clientHeight - 1;
        this.setState({height})
        
    }
    render() {
        let divStyle = {
            height: this.state.height
        }
        return (
            <div style={divStyle}></div>
        );

    }
}
export default HeaderSpace