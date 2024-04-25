// actions.js
export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";

// export const addTodo = (text) => ({
//     type: ADD_TODO,
//     payload: { text },
// });
// actions.js
export const addTodo = (id, text, date, priority) => {
    console.log("Adding todo with id:", id);
    console.log("Todo text:", text);
    console.log("Todo date:", date);
    console.log("Todo priority:", priority);

    return {
        type: ADD_TODO,
        payload: {
            id,
            text,
            date,
            priority,
        },
    };
};

export const editTodo = (id, newText, date, priority) => ({
    type: EDIT_TODO,
    payload: { id, newText, date, priority },
});
// export const editTodo = (editedTodo) => ({
//     type: EDIT_TODO,
//     payload: editedTodo,
// });
// actions.js
// export const editTodo = (id, newText, newDay, newPriority) => {
//     return async (dispatch) => {
//         try {
//             const response = await fetch(
//                 "http://localhost/projects/Task/phpdata/edit.php",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         id,
//                         text: newText,
//                         day: newDay,
//                         priority: newPriority,
//                     }),
//                 },
//             );
//             const data = await response.json();
//             if (data.status === "success") {
//                 // Dispatch action to update todo in Redux state
//                 dispatch({
//                     type: EDIT_TODO,
//                     payload: { id, newText, newDay, newPriority },
//                 });
//             } else {
//                 console.error("Failed to edit todo:", data.message);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };
// };

// export const deleteTodo = (id) => ({
//     type: DELETE_TODO,
//     payload: { id },
// });
export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    payload: { id }, // Wrap the id in an object
});
