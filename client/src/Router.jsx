import { HomePage } from "./pages";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={HomePage} />
			</Switch>
		</BrowserRouter>
	);
}
