import { cleanup, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import TextInput from "./TextInput";
import theme from "../../../styles/Theme.styles";
import userEvent from "@testing-library/user-event";
function setup() {
	const onChange = jest.fn();
	const utils = render(
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
	const getByPlaceholder = (placeholder) =>
		screen.getByPlaceholderText(placeholder);
	const write = (element, text) => userEvent.type(element, text);
	return { utils, getByPlaceholder, onChange, write };
}
describe("TextInput", () => {
	it("Shoult redner textInput", async () => {
		const { getByPlaceholder } = setup();
		const textInput = getByPlaceholder("input");
		expect(textInput.value).toEqual("");
		expect(textInput.placeholder).toEqual("input");
		expect(textInput.name).toEqual("input");
		expect(textInput.required).toEqual(true);
		cleanup();
	});
	it("Shoult change value", async () => {
		const { write, getByPlaceholder, onChange } = setup();
		const textInput = getByPlaceholder("input");
		write(textInput, "hello");
		expect(onChange).toHaveBeenCalled();
		cleanup();
	});
});
