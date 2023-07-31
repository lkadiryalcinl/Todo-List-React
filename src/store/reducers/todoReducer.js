const initialState = {
    data: [],
    favoriteTodos: [],
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
                data:state.data.filter(element => element.todoID !== action.payload.todoID),
                favoriteTodos : [action.payload,...state.favoriteTodos]
            }
        case 'REMOVE_FAV':
            return{
                ...state,
                favoriteTodos : state.favoriteTodos.filter(element => element.todoID !== action.payload.todoID),
                data :[action.payload,...state.data]
            }
        default:
            return state;
    }
};

export default todoReducer;
