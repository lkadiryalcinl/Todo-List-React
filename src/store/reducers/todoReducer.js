const initialState = {
    data: [],
    favoritedData: [],
    finishedData: []
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            return {
                ...state,
                data: action.payload
            };
        case 'ADD_FAV_DATA':
            return {
                ...state,
                favoritedData: action.payload
            };
        case 'ADD_FINISHED_DATA':
            return {
                ...state,
                finishedData: action.payload
            };
        case 'ADD_TODO':
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case 'ADD_FAV':
            return {
                ...state,
                favoritedData: [action.payload, ...state.favoritedData]
            }
        case 'ADD_FIN':
            return {
                ...state,
                finishedData: [action.payload, ...state.finishedData]
            }
        case 'REMOVE_FROM_DATA':
            return {
                ...state,
                data: state.data.filter(element => element.todoID !== action.payload.todoID),
            }
        case 'REMOVE_FROM_FAV_DATA':
            return {
                ...state,
                favoritedData: state.favoritedData.filter(element => element.todoID !== action.payload.todoID)
            }
        case 'REMOVE_FROM_FIN_DATA':

            return {
                ...state,
                finishedData: state.finishedData.filter(element => element.todoID !== action.payload.todoID),
            }
        default:
            return state;
    }
};

export default todoReducer;
