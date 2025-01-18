// Suggested code may be subject to a license. Learn more: ~LicenseLog:4124787544.
import React, { useState, createContext, useContext } from "react"
//src/

const ToDoContext = createContext()

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([
        { id: "1", title: "Task 1", status: "pending" },
        { id: "2", title: "Task 2", status: "pending" },
        { id: "3", title: "Task 3", status: "pending" },
    ])

    const [loading, setLoading] = useState(false)

    const addTodo = ({title}) => {
        const newId = todos.length > 0 ? (parseInt(todos[todos.length - 1].id,10) + 1).toString() : "1"
        setTodos([
            ...todos,
            {
                id: newId,
                title: title,
                status: "pending",
            },
        ])
        console.log(todos)
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const toggleStatus = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, status: todo.status === "pending" ? "completed" : "pending" } : todo
            )
        )
    }

    return (
        <ToDoContext.Provider value={{ todos, loading, addTodo, deleteTodo, toggleStatus }}>
            { children }
        </ToDoContext.Provider>
    )
}

export const useTodos = () => {
    const context = useContext(ToDoContext);
    return context
}