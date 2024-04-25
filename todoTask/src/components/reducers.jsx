import { ADD_TODO, EDIT_TODO, DELETE_TODO } from "./action";

const initialState = {
    todos: [],
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            console.log("Adding a todo:", action.payload);
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: action.payload.id,
                        text: action.payload.text,
                        date: action.payload.date,
                        priority: action.payload.priority,
                    },
                ],
            };
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? {
                              ...todo,
                              text: action.payload.newText,
                              date: action.payload.date,
                              priority: action.payload.priority,
                          }
                        : todo,
                ),
            };
        // case EDIT_TODO:
        //     return {
        //         ...state,
        //         todos: state.todos.map((todo) =>
        //             todo.id === action.payload.id ? action.payload : todo,
        //         ),
        //     };
        // reducer.js
        // case EDIT_TODO:
        //     return {
        //         ...state,
        //         todos: state.todos.map((todo) =>
        //             todo.id === action.payload.id
        //                 ? {
        //                       ...todo,
        //                       text: action.payload.newText,
        //                       day: action.payload.newDay,
        //                       priority: action.payload.newPriority,
        //                   }
        //                 : todo,
        //         ),
        //     };

        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(
                    (todo) => todo.id !== action.payload.id,
                ),
            };
        default:
            return state;
    }
};

export default todoReducer;
