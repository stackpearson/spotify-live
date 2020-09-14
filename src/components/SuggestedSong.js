import React, {useEffect, useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {connect} from 'react-redux';

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
    })


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
                       <div className='features'>Features</div>
                   </div>
               </div>
           </div>
    ) : ( 

        <p>just a moment while we load your song details</p> 
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
    {}
  )(SuggestedSong)