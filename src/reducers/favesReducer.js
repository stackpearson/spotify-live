export const initialState = {
    favoriteSongs: []
}

export const favesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FAVE_SONGS':
            return {
                ...state,
                favoriteSongs: action.payload
            };

            default:
                return state;
    }
}