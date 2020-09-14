import React, {useEffect, useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import axios from 'axios';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setGraphData} from '../actions/graphActions';
import Spinner from 'react-bootstrap/Spinner'

const SuggestedSong = (props) => {
    const [songData, setSongData] = useState()

    useEffect(() => {
        axiosWithAuth()
        .get(`/tracks/${props.songId}`)
        .then(res => {
            console.log(res)
            setSongData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    let history = useHistory();
    const getVisual = () => {
        axios 
        .get(`https://ds-bw-spotify.herokuapp.com/features/${encodeURI(songData.name)}`)
        .then((res) => {
            console.log('visuals', res)
            props.setGraphData(res.data.features)
        })
        .catch((res) => {
            console.log('failed visuals', res)
        })
    }


    return(<>

    {songData ? (
            <div className='individual-song-container'>
               <div className='song-img'>
                   <img alt='album artwork' className='img' src={songData.album.images[1].url} />
               </div>
               <div className='song-info'>
                   <div className='title'>
                       <p>{songData.name}</p>
                   </div>
                   <div className='artist'>
                       <p>{songData.artists[0].name}</p>
                   </div>
                   <div className='functionality'>
                       <div className='features' onClick={() => {getVisual(); history.push('/visuals')}}>Features</div>
                   </div>
               </div>
           </div>
    ) : ( 

        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    )}
 
    </>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {setGraphData}
  )(SuggestedSong)