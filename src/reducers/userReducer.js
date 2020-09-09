export const initialState = {
    isLoggedIn: false,
    authToken: '',
    user: ''
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };

        case 'SET_TOKEN':
            return {
                ...state,
                authToken: action.payload
            }

            default:
                return state;
    }
}

