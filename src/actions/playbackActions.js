export const setPause = input => {
    return {type: 'SET_PAUSE', payload: input}
}

export const setPlay = input => {
    return {type: 'SET_PLAY', payload: input}
}

export const setSongData = data => {
    return {type: 'SET_SONG_DATA', payload: data}
}

export const setTime = time => {
    return{type: 'SET_TIME', payload: time}
}