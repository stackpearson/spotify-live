import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import SpotifyWebApi from 'spotify-web-api-js';
import TopSong from './TopSong';
import {setFaveSongs} from '../actions/favesActions';

const Dashboard = (props) => {
    const Spotify = new SpotifyWebApi()
    const auth = localStorage.getItem('auth-token')

    useEffect(() => { 
      axiosWithAuth()
      .get('/me/top/tracks')
      .then(res => {
          props.setFaveSongs(res.data.items)
      })
    }, [])



    

    return (<>
    {/* {props.favesOnProps.favoriteSongs ? (

        <h2>Just a moment while we grab your top music!</h2>

    ) : (<> */}

    <h2>Check out your top tracks!</h2>
        <div className='song-container'> 
        {props.favesOnProps.favoriteSongs.map((song) => (
            <TopSong songData={song} />
        ))}
            
        </div>

    {/* </>)} */}
    
    </>)
}

const mapStateToProps = state => {
    return {
        favesOnProps: state.favesReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {setFaveSongs}
  )(Dashboard)