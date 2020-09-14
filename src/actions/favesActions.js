export const setFaveSongs = activeUser => {
    return {type: 'SET_FAVE_SONGS', payload: activeUser}
}

export const setActiveFave = activeUser => {
    return {type: 'SET_ACTIVE_FAVE', payload: activeUser}
}

export const setSuggestionIds = suggestions => {
    return {type: 'SET_SUGGESTION_IDS', payload: suggestions}
}

export const setSuggestions = songs => {
    return {type: 'SET_SUGGESTIONS'}
}