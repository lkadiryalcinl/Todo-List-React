const initialState = {
    userID: -1,
    user: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                ...state,
                userID: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                userID: -1
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;

