export const setUser = activeUser => {
    return {type: 'SET_USER', payload: activeUser}
}

export const setToken = activeToken => {
    return {type: 'SET_TOKEN', payload: activeToken}
}