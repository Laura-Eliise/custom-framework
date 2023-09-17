/** @jsx jsxTransform */
import { jsxTransform, router, m_if_else, m_if } from "../../mist/index";

const Footer = (state) => {
    return (
        <footer class="footer">
            { m_if_else(
				getNotCompletedCount(state) == 0 || getNotCompletedCount(state) > 1, 
				(<span class="todo-count"><strong>{getNotCompletedCount(state)}</strong> items left</span>), 
				(<span class="todo-count"><strong>{getNotCompletedCount(state)}</strong> item left</span>))
			}

            {<ul class="filters">
                <li>
                    <a style="cursor: pointer" class={isActive("/")} onClick={() => router.push({ type: "path", value: "/" })}>All</a>
                </li>
                <li>
                    <a style="cursor: pointer" class={isActive("/active")} onClick={() => router.push({ type: "path", value: "/active" })}>Active</a>
                </li>
                <li>
                    <a style="cursor: pointer" class={isActive("/completed")} onClick={() => router.push({ type: "path", value: "/completed" })}>Completed</a>
                </li>
            </ul>
}
            {m_if(getCompletedCount(state) > 0, (<button class="clear-completed" onClick={() => clearCompleted(state)}>Clear completed</button>))}
        </footer>
    )
}
 
export default Footer

const clearCompleted = (state) => {
    state.todos = state.todos.filter(todo => !todo.completed)
    localStorage.setItem("todos-mist", JSON.stringify(state.todos));
}

const getNotCompletedCount = (state) => {
    return state.todos.filter(todo => !todo.completed).length;
}

const getCompletedCount = (state) => {
    return state.todos.filter(todo => todo.completed).length;
}

const isActive = (path) => {
    return window.location.pathname == path ? "selected" : "";
}