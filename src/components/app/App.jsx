import React, { useEffect, useState } from 'react';
import Form from '../form/Form'
import './App.scss'
import deleted from './delete.png'


const App = () => {

    const [todos, setTodos] = useState([])
    const [allTodos, setAllTodos] = useState(0)
    const [allComplete, setAllComplete] = useState(0)


    useEffect(() => {
        setAllComplete(todos.filter(todo => todo.done === true).length)
    }, [todos])

    const putTodo = (value) => {
        if (value) {
            setTodos([...todos, {id: Date.now(), text: value, done: false}])
            setAllTodos(allTodos + 1)
        } else {
            alert("Введите текст!")
        }
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;

            return {
                ...todo,
                done: !todo.done
            }
        }))
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
        setAllTodos(allTodos - 1)
    } 

    const clearTodos = () => {
        setTodos([])
        setAllTodos(0)
    }

    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <h1 className="wrapper__title">TodoList</h1>
                    <Form 
                        putTodo={putTodo}
                    />
                    <ul className="wrapper__todos">
                        {
                            todos.map(todo => {
                                return (
                                    <li className={todo.done ? "wrapper__todo done" : 'wrapper__todo'} key={todo.id} onClick={() => toggleTodo(todo.id)}>
                                        {todo.text}
                                        <img src={deleted} alt="delete" className='wrapper__delete' onClick={e => {e.stopPropagation(); removeTodo(todo.id)}}/>
                                    </li>
                                )
                            })
                        }
                        <div className="wrapper__info">
                            <span>All todos: {allTodos}</span>
                            <span>complete: {allComplete}</span>
                        </div>
                        <button className='wrapper__btn' onClick={clearTodos}>Clear All</button>
                    </ul>
                </div>
          </div>
        </>
    );
};

export default App;