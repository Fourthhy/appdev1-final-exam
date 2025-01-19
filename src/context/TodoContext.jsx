import React, { useState, createContext, useContext, useEffect } from "react"

const ToDoContext = createContext()

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([
        { id: "1", title: "Task 1", status: "pending" },
        { id: "2", title: "Task 2", status: "pending" },
        { id: "3", title: "Task 3", status: "pending" },
    ]) 

    const [loading, setLoading] = useState(false)

    const addTodo = ({title}) => {
        setTodos([
            {
                id: todos.length + 1,
                title: title,
                status: "pending",
            },
            ...todos,
        ])
        console.log(todos)
    }

    const fetchTodo = async () => {
        setLoading(true)
        fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then((response) => response.json())
        .then((data) => {
                setLoading(false);
                setTodos(data);
        })
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const toggleStatus = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: todo.completed === true ? false : true } : todo
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