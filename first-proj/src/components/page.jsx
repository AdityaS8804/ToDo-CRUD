import React, { useState, useEffect } from "react";
import './pag.css'
const base_url = "http://127.0.0.1:8000/"
function Page() {
    const [todo, setTodo] = useState([])
    const [val, setVal] = useState('')
    const createTask = function (event) {
        if (val !== "") {
            event.preventDefault()
            fetch(base_url + "create/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    task: val
                })
            }).then(data => data.json()).then(r => {
                setTodo(t => {
                    setVal("")
                    return [...t, { task: r.task, id: r.id }]
                })
            }).catch(r => { console.log(r.JSON) })
        }
    }
    const clearTasks = function () {
        fetch(`${base_url}tasksClear/`, {
            method: "DELETE"
        }).then(data => setTodo([]))
    }
    const deleteTask = function (id) {
        fetch(`${base_url}taskDelete/${id}/`, {
            method: "DELETE"
        }).then(data => setTodo(t => {
            return t.filter(item => item.id != id)
        }))
    }
    useEffect(() => {
        async function pageLoad() {
            fetch(base_url + "tasks/").then(data => data.json()).then(r => setTodo(r))
        }

        pageLoad()
    }, [])


    return <div className="container">
        <h2 class="task-heading">Tasks To Do</h2>
        <form onSubmit={createTask}>
            <input className="task-input" type="text" value={val} onChange={e => {
                setVal(e.target.value)
            }} />
            <button className="task-button" type="submit">Enter</button>
        </form>
        <ul>
            {todo.map(t => {
                return <div className="component">
                    <li className="list-component">{t.task}</li>
                    <button className="delete-button" onClick={() => { deleteTask(t.id) }}>delete</button>
                </div>
            })}
        </ul>

        <button className="clear-button" onClick={clearTasks}>clear</button>
    </div>
}


export default Page