import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "../../../styles/Theme.styles";
import Title from "./Title";

describe("Title (ATOM)", () => {
	it("Should render Title", async () => {
		const { getByText } = render(
			<ThemeProvider theme={theme}>
				<Title txt="Title">
					{" "}
					<p>Label children</p>
				</Title>
			</ThemeProvider>,
		);
		const title = getByText("Title");

		expect(title).toBeInTheDocument();
	});
});
