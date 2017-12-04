import React, { Component } from 'react'
import ReactHighstrock from 'react-highcharts/ReactHighstock';
import LoadingIndicator from 'react-loading-indicator';

const SensorStream = ({data}) => {
    if(!data){
        return (<LoadingIndicator />);
    }
    // console.log("sensor", data.HR);
    let config = {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'Sensor Graph'
        },

        series: [
            {
                name: 'Heart Rate',
                data: data.HR,
                tooltip: {
                    valueDecimals: 2
                }
            }
            , {
                name: 'Respiration Rate',
                data: data.RR,
                tooltip: {
                    valueDecimals: 2
                }
            }
            , {
                name: 'Relative Stroke Volume',
                data: data.SV,
                tooltip: {
                    valueDecimals: 2
                }
            }
            , {
                name: 'Heart Rate Variability',
                data: data.HRV,
                tooltip: {
                    valueDecimals: 2
                }
            }
            , {
                name: 'Signal Strength',
                data: data.signalStrength,
                tooltip: {
                    valueDecimals: 2
                }
            }
        ]
    };
    return (
        <ReactHighstrock config={config} />
    )
}
export default SensorStream;