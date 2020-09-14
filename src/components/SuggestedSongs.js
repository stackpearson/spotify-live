import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setSuggestions, setSuggestionIds} from '../actions/favesActions';
import SuggestedSong from './SuggestedSong';

const SuggestedSongs = (props) => {

useEffect(() => {
    axios
    .post(`https://ds-bw-spotify.herokuapp.com/predict?item=${props.songOnProps.activeFave.id}`)
    .then((res) => {
        console.log('song suggestions pulled', res)
        props.setSuggestionIds(res.data.recommendations)
    })
    .catch((res) => console.log('failed song suggestions', res))
}, [])

    return(<>
        {props.songOnProps.suggestions ? (
            <div>
                {props.songOnProps.suggestionIds.map(song => (
                <div>
                    <SuggestedSong key={song} songId={song} />
                </div>
            ))}
            </div>
           
            

        ) : (
            <p>Just a moment while we suggest some new music</p>
        )}
    </>)
}

const mapStateToProps = state => {
    return {
        songOnProps: state.favesReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {setSuggestions, setSuggestionIds}
  )(SuggestedSongs)