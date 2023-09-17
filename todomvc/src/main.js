import { createApp, createStore } from "../mist/index";
import router from "./router/index.js";

let data = JSON.parse(localStorage.getItem("todos-mist"));
if (data === null) { localStorage.setItem("todos-mist", JSON.stringify([])) }
let todos = data !== null ? data : [];

let id = 1;
if (todos.length !== 0) {
	id = Math.max(...todos.map(todo => todo.id)) + 1;
}

createStore({
    todos: [ ...todos ],
    id: id
});

createApp("section.todoapp", router);