const initialState = {
    data: [],
    favoritedData: []
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                data:action.payload
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                data: state.data.filter(element => element.todoID !== action.payload)
            };
        case 'ADD_TODO':
            return{
                ...state,
                data :[...state.data,action.payload]
            }
        case 'ADD_FAV':
            return {
                ...state,
                data: [action.payload,...state.data],
                favoritedData: [action.payload,...state.favoritedData]
            }
        case 'REMOVE_FAV':
            return{
                ...state,
                data :[...state.data,action.payload],
                favoritedData: state.favoritedData.filter(element => element.todoID !== action.payload.todoID)
            }
        case 'REMOVE_FROM_LIST':
            return {
                ...state,
                data:state.data.filter(element => element.todoID !== action.payload.todoID),
            }
        default:
            return state;
    }
};

export default todoReducer;
