import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setActiveFave, setSuggestions} from '../actions/favesActions';

const TopSong = (props) => {


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
                    <div className='similar' onClick={() => {props.setActiveFave(props.songData);}}><Link to='/suggestions'>Similar</Link></div>
                    <div className='features'>Features</div>
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
    {setActiveFave, setSuggestions}
  )(TopSong)