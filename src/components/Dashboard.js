import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import TopSong from './TopSong';
import {setFaveSongs} from '../actions/favesActions';

const Dashboard = (props) => {

    useEffect(() => { 
      axiosWithAuth()
      .get('/me/top/tracks')
      .then(res => {
          props.setFaveSongs(res.data.items)
      })
    }, [])



    

    return (<>
        {props.favesOnProps.favoriteSongs ? (<>

        <h2 className='dashboard-header'>Your Top Tracks</h2>

        <div className='song-container'> 
        {props.favesOnProps.favoriteSongs.map((song) => (
            <TopSong key={song.id} songData={song} />
        ))}  
        </div>

        </>) : (

        <h2>Just a moment while we grab your top music!</h2>
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
    {setFaveSongs}
  )(Dashboard)