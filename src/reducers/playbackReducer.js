export const initialState = {
    songData: [],
    isPlaying: null,
    timeRemaining: null
}

export const playbackReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SONG_DATA': 
            return {
                ...state,
                songData: action.payload,
                isPlaying: action.payload.is_playing
            };

        case 'SET_TIME':
            return {
                ...state,
                timeRemaining: action.payload

            };
        
        case 'SET_PAUSE': 
            return {
                ...state,
                isPlaying: false,
            };

        case 'SET_PLAY': 
            return {
                ...state,
                isPlaying: true,
            };

            default:
                return state;
    }
}