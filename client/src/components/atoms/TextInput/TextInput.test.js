import { cleanup, render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import TextInput from "./TextInput";
import theme from "../../../styles/Theme.styles";
describe("TextInput (ATOM)", () => {
	afterEach(cleanup);
	it("Shoult redner textInput", async () => {
		const { getByPlaceholderText } = render(
			<ThemeProvider theme={theme}>
				<TextInput
					value=""
					name="input"
					onChange={jest.fn}
					placeholder="input"
					required={true}
				/>
			</ThemeProvider>,
		);
		const textInput = getByPlaceholderText("input");
		expect(textInput.value).toEqual("");
		expect(textInput.placeholder).toEqual("input");
		expect(textInput.name).toEqual("input");
		expect(textInput.required).toEqual(true);
	});
	it("Shoult change value", async () => {
		const onChange = jest.fn();
		const { getByPlaceholderText } = render(
			<ThemeProvider theme={theme}>
				<TextInput
					value=""
					name="input"
					onChange={onChange}
					placeholder="input"
					required={true}
				/>
			</ThemeProvider>,
		);
		const textInput = getByPlaceholderText("input");
		fireEvent.change(textInput, { target: { value: "value", name: "input" } });
		expect(onChange).toHaveBeenCalled();
	});
});
