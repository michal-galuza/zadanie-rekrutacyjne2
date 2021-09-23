import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "../../../styles/Theme.styles";
import Label from "./Label";

describe("Label (ATOM)", () => {
	it("Should render Label", async () => {
		const { getByText } = render(
			<ThemeProvider theme={theme}>
				<Label errorMsg="error" label="label">
					{" "}
					<p>Label children</p>
				</Label>
			</ThemeProvider>,
		);
		const error = getByText("error");
		const label = getByText("label");
		const children = getByText("Label children");
		expect(error).toBeInTheDocument();
		expect(label).toBeInTheDocument();
		expect(children).toBeInTheDocument();
	});
});
