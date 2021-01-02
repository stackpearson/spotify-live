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
                isLoggedIn: true,
                authToken: action.payload,
                user: localStorage.getItem('user-name')
            }

        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                authToken: '',
                user: ''
            }

            default:
                return state;
    }
}

