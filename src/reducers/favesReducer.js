export const initialState = {
    favoriteSongs: [],
    activeFave: {},
    suggestionIds: [],
    suggestions: []
}

export const favesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FAVE_SONGS':
            return {
                ...state,
                favoriteSongs: action.payload
            };

        case 'SET_ACTIVE_FAVE':
            return {
                ...state,
                activeFave: action.payload
            };

        case 'SET_SUGGESTION_IDS':
            return {
                ...state,
                suggestionIds: action.payload
            }

        case 'SET_SUGGESTIONS':
            return {
                ...state,
                suggestions: action.payload
            }

            default:
                return state;
    }
}