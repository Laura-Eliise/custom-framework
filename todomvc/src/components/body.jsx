/** @jsx jsxTransform */
import { jsxTransform, m_for } from "../../mist/index";
import { force_update } from "../../mist/modules/modules";
import Todo from "./todo";

const Body = (state) => {
  return (
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        checked={isChecked(state)}
        onClick={(e) => toggleAll(e, state)}
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">{m_for(filterTodos(state), Todo, state)}</ul>
    </section>
  );
};
export default Body;

const isChecked = (state) => {
	return state.todos.every(todo => todo.completed);
};

const toggleAll = (event, state) => {
	let checkbox = event.target;
	state.todos.map(todo => todo.completed = checkbox.checked)
  	force_update();
};

const filterTodos = (state) => {
  switch (window.location.pathname) {
    case "/":
      return state.todos;
    case "/active":
      return state.todos.filter((todo) => !todo.completed);
    case "/completed":
      return state.todos.filter((todo) => todo.completed);
    default:
      throw new Error("No valid path found");
  }
};
