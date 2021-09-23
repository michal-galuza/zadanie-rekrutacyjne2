import { cleanup, render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import theme from "../../../styles/Theme.styles";
import Paggiation from "./Paggination";

function setup() {
	const onClick = jest.fn();
	const pagginationProps = {
		totalCount: 20,
		actual: 0,
		limit: 10,
	};
	const utils = render(
		<ThemeProvider theme={theme}>
			<Paggiation {...pagginationProps} onClick={onClick} />
		</ThemeProvider>,
	);
	const getByText = (text) => screen.getByText(text);
	const click = (element) => userEvent.click(element);
	return { onClick, utils, click, getByText };
}

describe("Paggination", () => {
	it("Should render Paggination", async () => {
		const { getByText } = setup();
		expect(getByText("1")).toBeInTheDocument();
		expect(getByText("2")).toBeInTheDocument();
		cleanup();
	});
	it("Should trigger onClick", async () => {
		const { getByText, onClick, click } = setup();
		click(getByText("2"));
		await waitFor(() => expect(onClick).toHaveBeenCalled());
		cleanup();
	});
});
