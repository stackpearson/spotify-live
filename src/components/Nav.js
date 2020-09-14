import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logOut} from '../actions/userActions';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {setSongData, setTime, setPause, setPlay} from '../actions/playbackActions';

const Nav = (props) => {

    const [songName, setSongName] = useState()

    const getSong = async () => {
        try {
            let resp = await axiosWithAuth().get('/me/player/currently-playing');
            console.log('succesful song pull', resp.data);
            props.setSongData(resp.data)
            props.setTime(((resp.data.item.duration_ms - resp.data.progress_ms) + 25))
            setSongName(resp.data.item.name)
        } catch (err) {
            console.log('failed getsong', err)
        } 

    };

    const pauseSong = () => {
        axiosWithAuth()
        .put('/me/player/pause')
        .then(res => {
            props.setPause()
        })
    }

    const playSong = () => {
        axiosWithAuth()
        .put('/me/player/play')
        .then(res => {
            props.setPlay()
            getSong()
        })
    }

    const nextSong = () => {
        axiosWithAuth()
        .post('/me/player/next')
        .then(res => {
            console.log(res)
            getSong()
        })
        .catch(error => {
            console.log('failed skip', error)
        })
    }

    const previousSong = () => {
        axiosWithAuth()
        .post('/me/player/previous')
        .then(res => {
            console.log(res)
            getSong()
        })
        .catch(error => {
            console.log('failed back', error)
        })
    }

    useEffect(() => {
        getSong()
        setTimeout(getSong, props.playbackOnProps.timeRemaining)
    }, [songName])

    

    

    return (<>
    
        <div className='nav-bar'>
            {props.playbackOnProps.songData.is_playing ? (
            <div className='playback-box'>
                <div className='current-image'>
                    <img className='img' src={props.playbackOnProps.songData.item.album.images[2].url} alt='currently playing album artwork'></img>
                </div>
            
                <div className='song-and-controls'>
                    <div className='song-info'>
                        <span>{props.playbackOnProps.songData.item.name}</span>
                    </div>
                    <div className='playback-control'>
                            <div className='showButton' onClick={() => previousSong()}>&#129092;</div>
                            <div className={`${props.playbackOnProps.isPlaying === false ? 'showButton' : 'hideButton'}`} onClick={() => playSong()}>&#9654;</div>
                            <div className={`${props.playbackOnProps.isPlaying === true ? 'showButton' : 'hideButton'}`} onClick={() => pauseSong()}>&#9208;</div>
                            <div className='showButton' onClick={() => nextSong()}>&#129094;</div>
                    </div>
                </div>
            </div>

            ) : (

                <p>Spin up some music, you can control it here!</p>

            )}
    
            <div className='user-box'>
                <span>{props.userOnProps.user}</span>
                <Link to='/' className='logout' onClick = {() => props.logOut()}>Logout</Link>
            </div>
        </div>
        
    </>)
}

const mapStateToProps = state => {
    return {
        userOnProps: state.userReducer,
        playbackOnProps: state.playbackReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {logOut, setSongData, setTime, setPause, setPlay}
  )(Nav)