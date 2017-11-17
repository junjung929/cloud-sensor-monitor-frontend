import React, { Component } from 'react';

class Carousel extends Component {
    render() {
        let divStyle={
            marginTop: 0,
            position: "relative"
        }
        let caroucelText= {
            position: "absolute",
            width: "100%",
            height: "100%",
            color: "white",
            top: 0,
            
        }
        let imgStyle = {
            width: "100%"
        }
        let imgWrapperStyle = {
            backgroundColor: "grey",
            opacity: 0.7
        }
        let carouselImgSrc = "http://www.espoo.fi/download/noname/%7B8669A8BE-5F54-4E4A-944A-7F9FBB37D740%7D/84053";
        return (
            <div style={divStyle} className="carousel">       
                <div className="img-wrapper" style={imgWrapperStyle}>             
                    <img style={imgStyle} className="hospital-img" src={carouselImgSrc} alt="carousel img" />
                </div>
                <div style={caroucelText} >
                    <h1 className="text-center">Welcome to Monitoring page</h1>
                </div>
            </div>
        )
        
    }
}
export default Carousel;