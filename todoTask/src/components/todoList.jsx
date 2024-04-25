// // // TodoList.jsx
// import { useState } from "react";
// import { connect } from "react-redux";
// import { addTodo, editTodo, deleteTodo } from "./action";
// import "./style.css";

// function TodoList({ todos, dispatch }) {
//     const [newTodoText, setNewTodoText] = useState("");

//     const handleAddTodo = () => {
//         if (newTodoText.trim() !== "") {
//             const currentDate = new Date().toLocaleDateString();
//             dispatch(addTodo(newTodoText, currentDate));
//             setNewTodoText("");
//         }
//     };

//     const handleEditTodo = (id, newText) => {
//         dispatch(editTodo(id, newText));
//     };

//     const handleDeleteTodo = (id) => {
//         dispatch(deleteTodo(id));
//     };

//     return (
//         <div>
//             <div className="main">
//                 {/* <span className="todo">
//                     <p className="todo1">Todo list</p>
//                 </span> */}
//                 <div className="main2">
//                     <p className="todo">To Do List</p>
//                     <p className="week">This Week</p>
//                     <p className="day">Monday 2024</p>
//                     {/* <div className="bo">
//                         <div className="buy">
//                             <span>buy groceries</span>
//                             <span>High</span>
//                         </div>
//                         <div className="buy2">
//                             <button className="w">w</button>
//                             <button className="d">d</button>
//                         </div>
//                     </div> */}
//                     <input
//                         type="text"
//                         value={newTodoText}
//                         onChange={(e) => setNewTodoText(e.target.value)}
//                     />

//                     {todos.map((todo) => (
//                         <li key={todo.id}>
//                             <div className="bo">
//                                 <div className="buy">
//                                     <span>buy groceries</span>
//                                     <span>High</span>
//                                 </div>
//                                 <div className="buy2">
//                                     <button className="w">w</button>
//                                     <button className="d">d</button>
//                                 </div>
//                             </div>
//                             <input
//                                 type="text"
//                                 value={todo.text}
//                                 onChange={(e) =>
//                                     handleEditTodo(todo.id, e.target.value)
//                                 }
//                             />
//                             <button onClick={() => handleDeleteTodo(todo.id)}>
//                                 D
//                             </button>
//                         </li>
//                     ))}

//                     <div className="mainplus">
//                         <button className="plus" onClick={handleAddTodo}>
//                             +
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state) => ({
//     todos: state.todos,
// });

// export default connect(mapStateToProps)(TodoList);

// import { useState } from "react";
// import { connect } from "react-redux";
// import { addTodo, editTodo, deleteTodo } from "./action";
// import "./style.css";

// function TodoList({ todos, dispatch }) {
//     const [newTodoText, setNewTodoText] = useState("");
//     const [dayName, setDayName] = useState("");
//     const [priority, setPriority] = useState("High");
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editId, setEditId] = useState(null); // To track the id of the todo being edited

//     const handleAddTodo = () => {
//         if (newTodoText.trim() !== "" && dayName.trim() !== "") {
//             //  const currentDate = new Date().toLocaleDateString();
//             if (editId !== null) {
//                 // If editId is not null, it means we are editing an existing todo
//                 dispatch(editTodo(editId, newTodoText, dayName, priority));
//                 setEditId(null); // Reset editId after editing
//             } else {
//                 dispatch(addTodo(newTodoText, dayName, priority));
//             }
//             setNewTodoText("");
//             setDayName("");
//             setIsFormVisible(false);
//         }
//     };

//     const handleEditClick = (id, text, pri) => {
//         // Set the values of the todo being edited
//         setEditId(id);
//         setNewTodoText(text);
//         setPriority(pri);
//         setIsFormVisible(true);
//     };

//     const handleDeleteTodo = (id) => {
//         dispatch(deleteTodo(id));
//     };
//     console.log(todos);
//     return (
//         <div>
//             <div className="main">
//                 <div className="main2">
//                     <p className="todo">To Do List</p>
//                     <p className="week">This Week</p>

//                     <div className="mainplus">
//                         <button
//                             className="plus"
//                             onClick={() => setIsFormVisible(true)}
//                         >
//                             +
//                         </button>
//                         {isFormVisible && (
//                             <div>
//                                 <input
//                                     type="text"
//                                     value={newTodoText}
//                                     onChange={(e) =>
//                                         setNewTodoText(e.target.value)
//                                     }
//                                     placeholder="Enter todo text"
//                                 />
//                                 <input
//                                     type="date"
//                                     value={dayName}
//                                     onChange={(e) => setDayName(e.target.value)}
//                                     placeholder="Enter day name"
//                                 />
//                                 <select
//                                     value={priority}
//                                     onChange={(e) =>
//                                         setPriority(e.target.value)
//                                     }
//                                 >
//                                     <option value="High">High</option>
//                                     <option value="Medium">Medium</option>
//                                     <option value="Low">Low</option>
//                                 </select>
//                                 <button onClick={handleAddTodo}>
//                                     {editId !== null ? "Save" : "Add Todo"}
//                                 </button>
//                             </div>
//                         )}
//                     </div>

//                     {todos.map((todo) => (
//                         <span key={todo.id}>
//                             <p className="day">{todo.date}</p>
//                             <div className="bo">
//                                 <div className="buy">
//                                     <span>{todo.text}</span>
//                                     <span>{todo.priority}</span>
//                                 </div>
//                                 <div className="buy2">
//                                     <button
//                                         onClick={() =>
//                                             handleEditClick(
//                                                 todo.id,
//                                                 todo.text,
//                                                 todo.priority,
//                                             )
//                                         }
//                                         className="w"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() =>
//                                             handleDeleteTodo(todo.id)
//                                         }
//                                         className="d"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </span>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state) => ({
//     todos: state.todos,
// });

// export default connect(mapStateToProps)(TodoList);

// import { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { addTodo, editTodo, deleteTodo } from "./action";
// import "./style.css";
// import "tailwindcss/tailwind.css";

// function TodoList({ todos, dispatch }) {
//     const [newTodoText, setNewTodoText] = useState("");
//     const [dayName, setDayName] = useState("");
//     const [priority, setPriority] = useState("High");
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editId, setEditId] = useState(null); // To track the id of the todo being edited
//     useEffect(() => {
//         // Fetch initial todo data from the API when component mounts
//         fetchTodoData();
//     }, []);
//     const fetchTodoData = () => {
//         // Make an HTTP GET request to fetch todo data from your PHP server
//         fetch("http://localhost/projects/phpdata/fetchdata.php")
//             .then((response) => response.json())
//             .then((data) => {
//                 // Dispatch an action to update the Redux store with fetched todo data
//                 // Assuming the response data is an array of todo items
//                 console.log(data);
//                 data.forEach((todo) => {
//                     dispatch(addTodo(todo.text, todo.date, todo.priority));
//                 });
//             })
//             .catch((error) => {
//                 console.error("Error fetching todo data:", error);
//             });
//     };
//     const handleAddTodo = () => {
//         if (newTodoText.trim() !== "" && dayName.trim() !== "") {
//             const todoData = {
//                 text: newTodoText,
//                 day: dayName,
//                 priority: priority,
//             };

//             // Make an HTTP POST request to your PHP server
//             fetch("http://localhost/projects/phpdata/data.php", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(todoData),
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     // Handle response from server if needed
//                     console.log(data);
//                     // Assuming the server responds with a success message
//                     if (data.status === "success") {
//                         // Dispatch an action to update the Redux store or perform any other necessary actions
//                         dispatch(addTodo(newTodoText, dayName, priority));
//                         // Reset form fields and visibility
//                         setNewTodoText("");
//                         setDayName("");
//                         setIsFormVisible(false);
//                     } else {
//                         // Handle error response from server
//                         console.error("Failed to add todo:", data.message);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("Error:", error);
//                 });
//         }
//     };

//     const handleEditClick = (id, text, pri) => {
//         console.log(id);
//         // Set the values of the todo being edited
//         setEditId(id);
//         setNewTodoText(text);
//         setPriority(pri);
//         setIsFormVisible(true);
//     };

//     const handleDeleteTodo = (id) => {
//         dispatch(deleteTodo(id));
//     };

//     // Organizing todos based on their dates
//     const organizedTodos = todos.reduce((acc, todo) => {
//         if (!acc[todo.date]) {
//             acc[todo.date] = [];
//         }
//         acc[todo.date].push(todo);
//         return acc;
//     }, {});

//     return (
//         <div>
//             <div className="main">
//                 <div className="main2">
//                     <p className="todo">To Do List</p>
//                     <p className="week">This Week</p>

//                     <div className="mainplus">
//                         <button
//                             className="plus"
//                             onClick={() => setIsFormVisible(true)}
//                         >
//                             +
//                         </button>
//                         {isFormVisible && (
//                             <div className="mt-4 p-4 bg-gray-100 rounded">
//                                 <input
//                                     type="text"
//                                     value={newTodoText}
//                                     onChange={(e) =>
//                                         setNewTodoText(e.target.value)
//                                     }
//                                     placeholder="Enter todo text"
//                                     className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
//                                 />
//                                 <input
//                                     type="date"
//                                     value={dayName}
//                                     onChange={(e) => setDayName(e.target.value)}
//                                     placeholder="Enter day name"
//                                     className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
//                                 />
//                                 <select
//                                     value={priority}
//                                     onChange={(e) =>
//                                         setPriority(e.target.value)
//                                     }
//                                     className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
//                                 >
//                                     <option value="High">High</option>
//                                     <option value="Medium">Medium</option>
//                                     <option value="Low">Low</option>
//                                 </select>
//                                 <button
//                                     onClick={handleAddTodo}
//                                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                 >
//                                     {editId !== null ? "Save" : "Add Todo"}
//                                 </button>
//                             </div>
//                         )}
//                     </div>

//                     {/* Rendering todos grouped by date */}
//                     {Object.entries(organizedTodos).map(([date, todos]) => (
//                         <div key={date}>
//                             <p className="day">{date}</p>
//                             {todos.map((todo) => (
//                                 <div className="bo" key={todo.id}>
//                                     <div className="buy">
//                                         <span>{todo.text}</span>
//                                         <span>{todo.priority}</span>
//                                     </div>
//                                     <div className="buy2">
//                                         <button
//                                             onClick={() =>
//                                                 handleEditClick(
//                                                     todo.id,
//                                                     todo.text,
//                                                     todo.priority,
//                                                 )
//                                             }
//                                             className="w"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() =>
//                                                 handleDeleteTodo(todo.id)
//                                             }
//                                             className="d"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state) => ({
//     todos: state.todos,
// });

// export default connect(mapStateToProps)(TodoList);

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTodo, deleteTodo } from "./action";
import "./style.css";
import "tailwindcss/tailwind.css";

function TodoList({ todos, dispatch }) {
    const [newTodoText, setNewTodoText] = useState("");
    const [dayName, setDayName] = useState("");
    const [priority, setPriority] = useState("High");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editId, setEditId] = useState(null); // To track the id of the todo being edited
    const [a, seta] = useState("");
    useEffect(() => {
        console.log("i fire once");
        // Fetch initial todo data from the API when component mounts
        fetchTodoData();
    }, []);

    const fetchTodoData = () => {
        // Make an HTTP GET request to fetch todo data from your PHP server
        fetch("http://localhost/projects/phpdata/fetchdata.php")
            .then((response) => response.json())
            .then((data) => {
                // Dispatch an action to update the Redux store with fetched todo data
                // Assuming the response data is an array of todo items
                console.log("3", data);
                seta(data);
                data.forEach((todo) => {
                    dispatch(addTodo(todo.text, todo.day, todo.priority));
                });
            })
            .catch((error) => {
                console.error("Error fetching todo data:", error);
            });
    };

    const handleAddTodo = () => {
        // if (newTodoText.trim() !== "" && dayName.trim() !== "") {
        //     const todoData = {
        //         text: newTodoText,
        //         day: dayName,
        //         priority: priority,
        //     };
        const todoData = {
            name: newTodoText,
            date: dayName,
            pri: priority,
        };
        console.log("", todoData);
        // Make an HTTP POST request to your PHP server
        fetch("http://localhost/projects/phpdata/data.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todoData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle response from server if needed
                console.log("1", data);
                // Assuming the server responds with a success message
                if (data.status === "success") {
                    // Dispatch an action to update the Redux store or perform any other necessary actions
                    dispatch(addTodo(newTodoText, dayName, priority));
                    // Reset form fields and visibility
                    setNewTodoText("");
                    setDayName("");
                    setIsFormVisible(false);
                } else {
                    // Handle error response from server
                    console.error("Failed to add todo:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleEditClick = (id, text, pri) => {
        console.log(id);
        // Set the values of the todo being edited
        setEditId(id);
        setNewTodoText(text);
        setPriority(pri);
        setIsFormVisible(true);
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div className="mainComponent ">
            <div className="main ">
                <p className="todo text-xl font-bold mb-2">To Do List</p>
                <p className="week">This Week</p>

                <div className="mainplus mt-4">
                    <button
                        className="plus bg-blue-500 text-white px-3 py-2 rounded"
                        onClick={() => setIsFormVisible(true)}
                    >
                        +
                    </button>
                    {isFormVisible && (
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                            <input
                                type="text"
                                value={newTodoText}
                                onChange={(e) => setNewTodoText(e.target.value)}
                                placeholder="Enter todo text"
                                className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                            />
                            <input
                                type="date"
                                value={dayName}
                                onChange={(e) => setDayName(e.target.value)}
                                placeholder="Enter day name"
                                className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                            />
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <button
                                onClick={handleAddTodo}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {editId !== null ? "Save" : "Add Todo"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Rendering todos */}
                {todos.map((todo) => (
                    <div
                        className="bo border-b border-gray-300 py-3 flex justify-between"
                        key={todo.id}
                    >
                        <div className="buy">
                            <span>{todo.text}</span>
                            <span className="ml-2">{todo.priority}</span>
                        </div>
                        <div className="buy2">
                            <button
                                onClick={() =>
                                    handleEditClick(
                                        todo.id,
                                        todo.text,
                                        todo.priority,
                                    )
                                }
                                className="w px-2 py-1 bg-blue-500 text-white rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.todos,
});

export default connect(mapStateToProps)(TodoList);
