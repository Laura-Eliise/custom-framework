/** @jsx jsxTransform */
import { force_update, jsxTransform } from "../../mist/index";

const Header = (state) => {
	return (
		<header class="header">
			<h1>todos</h1>
			<input onKeyDown={(e) => createTodo(e, state)} class="new-todo" placeholder="What needs to be done?" autofocus />
		</header>
	)
};

export default Header;

const ENTER_KEY = 13;

const createTodo = (event, state) => {
	if (event.keyCode !== ENTER_KEY) return;

	if (event.target.value.trim() === "") return;

	state.todos = [...state.todos, { 
		id: state.id, 
		title: event.target.value.trim(), 
		completed: false,
	}];

    localStorage.setItem("todos-mist", JSON.stringify(state.todos));
	state.id++
	event.target.value = ""
	force_update();
}