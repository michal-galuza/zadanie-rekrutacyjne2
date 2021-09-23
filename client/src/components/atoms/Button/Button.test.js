import { cleanup, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import theme from "../../../styles/Theme.styles";
import Button from "./Button";
function setup(props = {}) {
	const buttonMock = {
		title: "button",
		text: "button",
		disabled: false,
		...props,
	};
	const onClick = jest.fn();
	const utils = render(
		<ThemeProvider theme={theme}>
			<Button {...buttonMock} onClick={onClick} />
		</ThemeProvider>,
	);
	const getByText = () => utils.getByText(buttonMock.text);
	const click = () => userEvent.click(utils.getByText(buttonMock.text));
	return { buttonMock, onClick, utils, click, getByText };
}

describe("Button (Atom)", () => {
	it("Should render button", async () => {
		const utils = setup();
		const button = utils.getByText();
		expect(button).toBeInTheDocument();
		expect(button.title).toEqual(utils.buttonMock.title);
		expect(button.type).toEqual("button");
		expect(button.disabled).toEqual(utils.buttonMock.disabled);
		cleanup();
	});
	it("Should trigger onClick", async () => {
		const utils = setup();
		utils.click();
		await waitFor(() => expect(utils.onClick).toHaveBeenCalled());
		cleanup();
	});
	it("Should not trigger onClick", async () => {
		const utils = setup({ disabled: true });
		utils.click();
		expect(utils.onClick).not.toHaveBeenCalled();
		cleanup();
	});
});
