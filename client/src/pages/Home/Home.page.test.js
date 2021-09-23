import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "../../store/store";
import theme from "../../styles/Theme.styles";
import Home from "./Home.page";
function setup() {
	const utils = render(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Home />
			</ThemeProvider>
		</Provider>,
	);

	const getByText = (text) => screen.getByText(text);
	const getByLabel = (text) => screen.getByLabelText(text);
	const write = (element, text) => userEvent.type(element, text);
	const click = (element) => userEvent.click(element);
	return { utils, getByLabel, getByText, write, click };
}
describe("Home (PAGE)", () => {
	it("Should render Home page form", async () => {
		const { getByLabel, getByText } = setup();
		expect(getByLabel("Firstname")).toBeInTheDocument();
		expect(getByLabel("Lastname")).toBeInTheDocument();
		expect(getByLabel("Email")).toBeInTheDocument();
		expect(getByText("Date")).toBeInTheDocument();
		expect(getByText("Hour")).toBeInTheDocument();
		expect(getByText("Create")).toBeInTheDocument();
		expect(getByText("Create new event")).toBeInTheDocument();
		cleanup();
	});
});
