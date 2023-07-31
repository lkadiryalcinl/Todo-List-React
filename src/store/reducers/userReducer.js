const initialState = {
    userID: -1,
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
        default:
            return state;
    }
};

export default userReducer;

