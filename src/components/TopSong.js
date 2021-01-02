import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setActiveFave, setSuggestions} from '../actions/favesActions';
import {setGraphData} from '../actions/graphActions';


const TopSong = (props) => {

    let history = useHistory();

    const getVisual = () => {
        axios 
        .get(`https://ds-bw-spotify.herokuapp.com/features/${encodeURI(props.songData.name)}`)
        .then((res) => {
            console.log('visuals', res)
            props.setGraphData(res.data.features)
        })
        .catch((res) => {
            console.log('failed visuals', res)
        })
    }


    return(<>
        <div className='individual-song-container'>
            <div className='song-img'><img alt='album artwork' className='img' src={props.songData.album.images[1].url} /></div>
            <div className='song-info'>
                <div className='title'>
                    <p>{props.songData.name}</p>
                </div>
                <div className='artist'>
                    <p>{props.songData.artists[0].name}</p>
                </div>
                <div className='functionality'>
                    <div className='features' onClick={() => {getVisual(); history.push('/visuals')}}>Features</div>
                </div>
            </div>
        </div>
    </>)

}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {setActiveFave, setSuggestions, setGraphData}
  )(TopSong)