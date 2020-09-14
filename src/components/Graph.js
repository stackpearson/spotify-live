import React from 'react';
import CanvasJSReact from '../canvasjs.react';
import {connect} from 'react-redux';
import {setGraphData, purgeOptions} from '../actions/graphActions';
import {useHistory} from 'react-router-dom';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;



const Graph = (props) => {

    let history = useHistory();

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        title:{
            // text: props.graphOnProps.dataPoints.song_name
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}",		
            startAngle: -90,
            dataPoints: [
                { y: (props.graphOnProps.dataPoints.danceability * 100), label: "Danceability" },
                { y: (props.graphOnProps.dataPoints.energy * 100), label: "Energy" },
                { y: (props.graphOnProps.dataPoints.acousticness * 100), label: "Acousticness" },
                { y: (props.graphOnProps.dataPoints.liveness * 100), label: "Loudness" }	
            ]
        }]
    }

    return(<>

        {props.graphOnProps ? (
                    <div className='graph-container'>
                    <div className='graph-functionality' onClick={() => {props.purgeOptions(); history.goBack()}}>
                        x
                    </div>
                    <CanvasJSChart options = {options} />
                </div>
        ) : (
            <p>Just a moment while we load some stuff</p>
        )}

    </>)
}

const mapStateToProps = state => {
    return {
        graphOnProps: state.graphReducer
    }
}

export default connect(
    mapStateToProps,
    {setGraphData, purgeOptions}
)(Graph)