/** @jsx jsxTransform */
import { jsxTransform, m_if } from "../../mist/index";
import Footer from "../components/footer";
import Header from "../components/header";
import Body from "../components/body";

const Active = (state) => {
	return (
		<div>
			{Header(state)}
			{ m_if(state.todos.length !== 0, ( Body(state)))}
			{ m_if(state.todos.length !== 0, ( Footer(state)))}
		</div>
	)
}

export default Active