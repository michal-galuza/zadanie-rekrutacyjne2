import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import PagginationItem from "./PagginationItem";
import theme from "../../../styles/Theme.styles";

describe("PagginationItem (Atom)", () => {
	afterEach(cleanup);

	it("Should render PagginationItem", async () => {
		const { getByText } = render(
			<ThemeProvider theme={theme}>
				<PagginationItem value={1} />
			</ThemeProvider>,
		);
		const pagginationItem = getByText("2");
		expect(pagginationItem).toBeInTheDocument();
	});
	it("Should run on click function", async () => {
		let onClick = jest.fn();
		const { getByText } = render(
			<ThemeProvider theme={theme}>
				<PagginationItem value={1} onClick={onClick} />
			</ThemeProvider>,
		);
		const pagginationItem = getByText("2");
		fireEvent.click(pagginationItem);

		await waitFor(() => expect(onClick).toHaveBeenCalled());
	});
});
