import { createRouter } from "../../mist/index";
import Home from "../views/home";
import Active from "../views/active";
import Completed from "../views/completed";

const router = createRouter([
	{
		path: "/",
		name: "home",
		title: "All Todos",
		view: Home
	},
	{
		path: "/active",
		name: "active",
		title: "Active Todos",
		view: Active
	},
	{
		path: "/completed",
		name: "completed",
		title: "Completed Todos",
		view: Completed
	},
]);

export default router;