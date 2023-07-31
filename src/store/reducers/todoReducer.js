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
        case 'REMOVE_TODO':
            return {
                ...state,
                data: state.data.filter(element => element.todoID !== action.payload)
            };
        case 'ADD_TODO':
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case 'ADD_FAV':
            return {
                ...state,
                data: [action.payload, ...state.data],
                favoritedData: [action.payload, ...state.favoritedData],
            }
        case 'REMOVE_FAV':
            return {
                ...state,
                data: [...state.data, action.payload],
                favoritedData: state.favoritedData.filter(element => element.todoID !== action.payload.todoID),
                finishedData: state.finishedData.filter(element => element.todoID !== action.payload.todoID) && [...state.finishedData]
            }
        case 'ADD_FINISHED':
            return {
                ...state,
                finishedData: [action.payload, ...state.finishedData],

            }
        case 'REMOVE_FINISHED':
            return {
                ...state,
                finishedData: state.finishedData.filter(element => element.todoID !== action.payload.todoID),
                data: [...state.data, action.payload]
            }
        case 'REMOVE_FROM_LIST':
            return {
                ...state,
                data: state.data.filter(element => element.todoID !== action.payload.todoID),
            }
        default:
            return state;
    }
};

export default todoReducer;
