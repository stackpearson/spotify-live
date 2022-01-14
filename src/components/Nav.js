import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logOut} from '../actions/userActions';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {setSongData, setTime, setPause, setPlay} from '../actions/playbackActions';
import {Dropdown} from 'react-bootstrap';
import { Icon } from '@iconify/react';

const Nav = (props) => {

    const [songName, setSongName] = useState()
    const [timeStamp, setTimeStamp] = useState()
    const [devices, setDevices] = useState()

    useEffect(() => {
        getSong();
        showDevices()
    }, [])

    const getSong = async () => {
        try {
            let resp = await axiosWithAuth().get('/me/player/currently-playing');
            // console.log('succesful song pull', resp.data);
            props.setSongData(resp.data)
            props.setTime(((resp.data.item.duration_ms - resp.data.progress_ms) + 1000))
            setTimeStamp(resp.data.timestamp)
            setSongName(resp.data.item.name)
        } catch (err) {
            console.log('failed getsong', err)
        } 

    };

    const showDevices = () => {
        axiosWithAuth()
        .get('/me/player/devices')
        .then(res => {
            setDevices(res.data.devices)
        })
    }

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
            delayedSongPull()
        })
    }

    const nextSong = () => {
        axiosWithAuth()
        .post('/me/player/next')
        .then(res => {
            // console.log(res)
            props.setTime(1500)
            delayedSongPull()
        })
        .catch(error => {
            console.log('failed skip', error)
        })
    }

    const previousSong = () => {
        axiosWithAuth()
        .post('/me/player/previous')
        .then(res => {
            props.setTime(1500)
            delayedSongPull()
        })
        .catch(error => {
            console.log('failed back', error)
        })
    }

    const delayedSongPull = () => {
        setTimeout(getSong, 1500);
    }

    setTimeout(getSong, props.playbackOnProps.timeRemaining || 60000);

    
    
    

    

    

    return (<>
    
        <nav className='nav-bar'>

            
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
                            <div className='showButton' onClick={() => previousSong()}><Icon icon="cil:media-step-backward" /></div>
                            <div className={`${props.playbackOnProps.isPlaying === false ? 'showButton' : 'hideButton'}`} onClick={() => playSong()}><Icon icon="cil:media-play" /></div>
                            <div className={`${props.playbackOnProps.isPlaying === true ? 'showButton' : 'hideButton'}`} onClick={() => pauseSong()}><Icon icon="cil:media-pause" /></div>
                            <div className='showButton' onClick={() => nextSong()}><Icon icon="cil:media-step-forward" /></div>
                    </div>
                </div>
            </div>

            ) : (

            <div className='playback-box'>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    <span onClick={() => showDevices()}>Devices</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    { devices ? (
                        <>{devices.map(device => {
                            
                            return (
                                <Dropdown.Item onClick={() => getSong()}>{device.name} {(device.is_active) ? '- Play Here' : ''} </Dropdown.Item>
                            )
                        })}</>
                    ) : (
                        <p>No devices</p>
                    )}
     
                </Dropdown.Menu>
                </Dropdown>
            </div>

            )}
    
            <div className='user-box'>
                <span>{props.userOnProps.user}</span>
                <Link to='/' className='logout' onClick = {() => props.logOut()}>Logout</Link>
            </div>
        </nav>
        
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