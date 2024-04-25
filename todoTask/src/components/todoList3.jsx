import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./action";
import "./style.css";

function TodoList4({ todos, dispatch }) {
    const [newTodoText, setNewTodoText] = useState("");
    const [dayName, setDayName] = useState("");
    const [priority, setPriority] = useState("High");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editTodoText, setEditTodoText] = useState("");
    const [editDayName, setEditDayName] = useState("");
    const [editPriority, setEditPriority] = useState("High");
    const groupedTodos = todos.reduce((acc, todo) => {
        if (!acc[todo.day]) {
            acc[todo.day] = [];
        }
        acc[todo.day].push(todo);
        return acc;
    }, {});
    const fetchTodoData = useCallback(() => {
        fetch("http://localhost/projects/Task/phpdata/fetchdata.php")
            .then((response) => response.json())
            .then((data) => {
                data.forEach((todo) => {
                    dispatch(
                        addTodo(todo.id, todo.text, todo.day, todo.priority),
                    );
                });
            })
            .catch((error) => {
                console.error("Error fetching :", error);
            });
    }, [dispatch]);

    useEffect(() => {
        fetchTodoData();
    }, [fetchTodoData]);

    const handleAddTodo = () => {
        const todoData = {
            text: newTodoText,
            day: dayName,
            priority: priority,
            date: new Date().toISOString().slice(0, 10), // Adding current date
        };

        fetch("http://localhost/projects/Task/phpdata/data.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todoData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    dispatch(addTodo(data.id, newTodoText, dayName, priority));

                    setNewTodoText("");
                    setDayName("");
                    setIsFormVisible(false);
                } else {
                    console.error("Failed to add todo:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: "long",

            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
    };
    const handleEditClick = (id, text, day, priority) => {
        setEditId(id);
        setEditTodoText(text);
        setEditDayName(day);
        setEditPriority(priority);
    };

    const handleEditSubmit = () => {
        const editedTodo = {
            id: editId,
            text: editTodoText,
            day: editDayName,
            priority: editPriority,
            date: new Date().toISOString().slice(0, 10),
        };

        setEditId(null);
        setEditTodoText("");
        setEditDayName("");
        setEditPriority("High");

        fetch("http://localhost/projects/Task/phpdata/edit.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedTodo),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    dispatch(
                        editTodo(
                            editId,
                            editTodoText,
                            editDayName,
                            editPriority,
                            editedTodo.date,
                        ),
                    );
                } else {
                    console.error("Failed to edit todo:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleDeleteTodo = (id) => {
        fetch(`http://localhost/projects/Task/phpdata/delete.php?id=${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    dispatch(deleteTodo(id));
                } else {
                    console.error("Failed to delete todo:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        //       <div className="mainComponent p-5">
        //     <div className="main mx-auto max-w-screen-lg">
        //         <p className="todo text-xl font-bold mb-2">To Do List</p>
        //         <br />
        //         <p className="week mt-5 mb-5">This Week</p>

        //         <div className="mainplus mt-4">
        //             <button
        //                 className="w px-2 py-1  text-white rounded"
        //                 onClick={() => setIsFormVisible(true)}
        //             >
        //                 <img src="/plus.png" />
        //             </button>

        //             {isFormVisible && (
        //                 <div className="fixed inset-0 flex items-center justify-center z-50">
        //                     <div className=" opacity-50"></div>
        //                     <div className="bg-white rounded-lg p-4 max-w-md w-full">
        //                         <div className="mb-4">
        //                             <input
        //                                 type="text"
        //                                 required
        //                                 value={newTodoText}
        //                                 onChange={(e) =>
        //                                     setNewTodoText(e.target.value)
        //                                 }
        //                                 placeholder="Enter todo text"
        //                                 className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
        //                             />
        //                             <input
        //                                 type="date"
        //                                 required
        //                                 value={dayName}
        //                                 onChange={(e) =>
        //                                     setDayName(e.target.value)
        //                                 }
        //                                 placeholder="Enter day name"
        //                                 className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
        //                             />
        //                             <select
        //                                 value={priority}
        //                                 required
        //                                 onChange={(e) =>
        //                                     setPriority(e.target.value)
        //                                 }
        //                                 className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
        //                             >
        //                                 <option value="High">High</option>
        //                                 <option value="Medium">Medium</option>
        //                                 <option value="Low">Low</option>
        //                             </select>
        //                         </div>
        //                         <button
        //                             onClick={handleAddTodo}
        //                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        //                         >
        //                             Add Todo
        //                         </button>
        //                     </div>
        //                 </div>
        //             )}
        //         </div>

        //         {Object.entries(
        //             todos.reduce((acc, todo) => {
        //                 if (!acc[todo.date]) {
        //                     acc[todo.date] = [];
        //                 }
        //                 acc[todo.date].push(todo);
        //                 return acc;
        //             }, {}),
        //         ).map(([date, todos]) => (
        //             <div key={date}>
        //                 <span className="t">{formatDate(date)}</span>
        //                 {todos.map((todo) => (
        //                     <div
        //                         className="bo border-b border-gray-300 py-3 flex justify-between"
        //                         key={todo.id}
        //                     >
        //                         <div className="buy">
        //                             <span>{todo.text}</span>
        //                             <span className="priori ml-2">
        //                                 {todo.priority}
        //                             </span>
        //                         </div>
        //                         <div className="buy2">
        //                             <button
        //                                 onClick={() =>
        //                                     handleEditClick(
        //                                         todo.id,
        //                                         todo.text,
        //                                         todo.day,
        //                                         todo.priority,
        //                                     )
        //                                 }
        //                                 className="w px-2 py-1  text-white rounded"
        //                             >
        //                                 <img src="/edit.png" />
        //                             </button>
        //                             <button
        //                                 onClick={() =>
        //                                     handleDeleteTodo(todo.id)
        //                                 }
        //                                 className="w px-2 py-1  text-white rounded"
        //                             >
        //                                 <img src="/del.png" />
        //                             </button>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>
        //         ))}

        //         {editId !== null && (
        //             <div className="mt-4 p-4 bg-gray-100 rounded">
        //                 <input
        //                     type="text"
        //                     required
        //                     value={editTodoText}
        //                     onChange={(e) => setEditTodoText(e.target.value)}
        //                     placeholder="Enter todo text"
        //                     className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
        //                 />
        //                 <input
        //                     type="date"
        //                     required
        //                     value={editDayName}
        //                     onChange={(e) => setEditDayName(e.target.value)}
        //                     placeholder="Enter day name"
        //                     className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
        //                 />
        //                 <select
        //                     value={editPriority}
        //                     required
        //                     onChange={(e) => setEditPriority(e.target.value)}
        //                     className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
        //                 >
        //                     <option value="High">High</option>
        //                     <option value="Medium">Medium</option>
        //                     <option value="Low">Low</option>
        //                 </select>
        //                 <div className="flex justify-between">
        //                     <button
        //                         onClick={handleEditSubmit}
        //                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        //                     >
        //                         Save
        //                     </button>
        //                     <button
        //                         onClick={() => {
        //                             setEditId(null);
        //                             setEditTodoText("");
        //                             setEditDayName("");
        //                             setEditPriority("High");
        //                         }}
        //                         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        //                     >
        //                         Close
        //                     </button>
        //                 </div>
        //             </div>
        //         )}
        //     </div>
        // </div>
        <div className="mainComponent p-5">
            <div className="main mx-auto max-w-screen-lg">
                <p className="todo text-xl font-bold mb-2">To Do List</p>
                <br />
                <p className="week mt-5 mb-5">This Week</p>

                <div className="mainplus mt-4">
                    <button
                        className="w px-2 py-1  text-white rounded"
                        onClick={() => setIsFormVisible(true)}
                    >
                        <img src="/plus.png" />
                    </button>

                    {isFormVisible && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className=" opacity-50"></div>
                            <div className="bg-white rounded-lg p-4 max-w-md w-full">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        required
                                        value={newTodoText}
                                        onChange={(e) =>
                                            setNewTodoText(e.target.value)
                                        }
                                        placeholder="Enter todo text"
                                        className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="date"
                                        required
                                        value={dayName}
                                        onChange={(e) =>
                                            setDayName(e.target.value)
                                        }
                                        placeholder="Enter day name"
                                        className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                                    />
                                    <select
                                        value={priority}
                                        required
                                        onChange={(e) =>
                                            setPriority(e.target.value)
                                        }
                                        className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <button
                                    onClick={handleAddTodo}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add Todo
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {Object.entries(
                    todos.reduce((acc, todo) => {
                        if (!acc[todo.date]) {
                            acc[todo.date] = [];
                        }
                        acc[todo.date].push(todo);
                        return acc;
                    }, {}),
                ).map(([date, todos]) => (
                    <div key={date}>
                        <span className="t">{formatDate(date)}</span>
                        {todos.map((todo) => (
                            <div
                                className="bo border-b border-gray-300 py-3 flex justify-between"
                                key={todo.id}
                            >
                                <div className="buy">
                                    <span>{todo.text}</span>
                                    <span className="priori ml-2">
                                        {todo.priority}
                                    </span>
                                </div>
                                <div className="buy2">
                                    <button
                                        onClick={() =>
                                            handleEditClick(
                                                todo.id,
                                                todo.text,
                                                todo.day,
                                                todo.priority,
                                            )
                                        }
                                        className="w px-2 py-1  text-white rounded"
                                    >
                                        <img src="/edit.png" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteTodo(todo.id)
                                        }
                                        className="w px-2 py-1  text-white rounded"
                                    >
                                        <img src="/del.png" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                {editId !== null && (
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <input
                            type="text"
                            required
                            value={editTodoText}
                            onChange={(e) => setEditTodoText(e.target.value)}
                            placeholder="Enter todo text"
                            className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                        />
                        <input
                            type="date"
                            required
                            value={editDayName}
                            onChange={(e) => setEditDayName(e.target.value)}
                            placeholder="Enter day name"
                            className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                        />
                        <select
                            value={editPriority}
                            required
                            onChange={(e) => setEditPriority(e.target.value)}
                            className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <div className="flex justify-between">
                            <button
                                onClick={handleEditSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setEditId(null);
                                    setEditTodoText("");
                                    setEditDayName("");
                                    setEditPriority("High");
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.todos,
});

export default connect(mapStateToProps)(TodoList4);
