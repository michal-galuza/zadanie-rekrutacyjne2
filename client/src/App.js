import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { GlobalStyles } from "./styles/Global.styles";
import theme from "./styles/Theme.styles";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Router />
			</ThemeProvider>
		</Provider>
	);
}
