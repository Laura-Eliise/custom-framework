/** @jsx jsxTransform */
import { jsxTransform, force_update } from "../../mist/index";

const Todo = (todo, state) => {
    return (
        <li class={completed(todo)} id={todo.id}>
            <div class="view">
                <input class="toggle" type="checkbox" onClick={(e) => toggleCompleted(e, state)} checked={todo.completed}/>
                <label onDblClick={(e) => startEditing(e)} >{todo.title}</label>
                <button class="destroy" onClick={(e) => removeTodo(e, state)}></button>
            </div>
            <input class="edit" value={todo.title} 
				onKeyDown={e => editTodo(e, state)} 
				onBlur={e => editTodo(e, state)} 
			/> 
        </li>
    )
}

export default Todo;

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const startEditing = (event) => {
    const todoEl = event.target.parentElement.parentElement;
    todoEl.classList.add("editing");
	todoEl.querySelector(".edit").focus();
}

const editTodo = (event, state) => {
	const todoEl = event.target.parentElement;

	if (event.keyCode === ESCAPE_KEY) {
    	event.preventDefault();
    	todoEl.classList.remove("editing");
		event.target.value = todoEl.querySelector("label").innerText;
		return;
	}

	/** Pass if enter pressed or focus lost and todo has class 'editing' */
    if (event.keyCode !== ENTER_KEY && event.type !== "blur" || !todoEl.classList.contains("editing")) return;

    const todo = state.todos.find(todo => todo.id == todoEl.id);
   	const todoIndex = state.todos.indexOf(todo);
	const value = todoEl.querySelector(".edit").value.trim();

	/** If value empty remove todo */
	if (value === "") {
		state.todos = state.todos.filter(todo => todo.id != todoEl.id);
		return;
	}

    state.todos[todoIndex].title = value;

    localStorage.setItem("todos-mist", JSON.stringify(state.todos));

    todoEl.classList.remove("editing")
	force_update()
}

const toggleCompleted = (event, state) => {
    const todoId = event.target.parentElement.parentElement.id;
    const todo = state.todos.find(todo => todo.id == todoId);
	const todoIndex = state.todos.indexOf(todo);

	state.todos[todoIndex].completed = !todo.completed;
    localStorage.setItem("todos-mist", JSON.stringify(state.todos));
	force_update();
}

const removeTodo = (event, state) => {
    const todoId = event.target.parentElement.parentElement.id;
    state.todos = state.todos.filter(todo => todo.id != todoId);
    localStorage.setItem("todos-mist", JSON.stringify(state.todos));
}

const completed = (todo) => {
    return todo.completed ? "completed" : ""
}