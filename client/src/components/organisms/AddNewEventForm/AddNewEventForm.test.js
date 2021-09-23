import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { AddNewEventForm } from "..";
import theme from "../../../styles/Theme.styles";
import userEvent from "@testing-library/user-event";

function setup(props = {}) {
	const handleSubmit = jest.fn();
	const formProps = {
		status: { isLoading: false, isSuccess: false, error: null },
		...props,
	};
	const utils = render(
		<ThemeProvider theme={theme}>
			<AddNewEventForm onSubmit={handleSubmit} {...formProps} />
		</ThemeProvider>,
	);
	const write = (text, label) =>
		userEvent.type(screen.getByLabelText(label), text);
	const getByText = (text) => screen.getByText(text);
	const getByLabel = (text) => screen.getByLabelText(text);
	const click = (elementText) => userEvent.click(screen.getByText(elementText));
	return {
		write,
		getByText,
		click,
		utils,
		handleSubmit,
		formProps,
		getByLabel,
	};
}

describe("AddNewEventForm", () => {
	it("should render form", async () => {
		const { getByText, getByLabel } = setup();
		expect(getByLabel("Lastname")).toBeInTheDocument();
		expect(getByLabel("Firstname")).toBeInTheDocument();
		expect(getByLabel("Email")).toBeInTheDocument();
		expect(getByLabel("Date")).toBeInTheDocument();
		expect(getByText("Hour")).toBeInTheDocument();
		expect(getByText("Create")).toBeInTheDocument();
		cleanup();
	});
	it("should submit the form", async () => {
		const { handleSubmit, write, click } = setup();
		write("Doe", "Lastname");
		write("John", "Firstname");
		write("email@mail.com", "Email");
		click("Create");

		await waitFor(() =>
			expect(handleSubmit).toHaveBeenCalledWith(
				expect.objectContaining({
					firstname: "John",
					lastname: "Doe",
					email: "email@mail.com",
					date: expect.any(Date),
					time: "12:30",
				}),
				expect.any(Object),
			),
		);
		cleanup();
	});
	it("should not submit the form , and display errors", async () => {
		const { handleSubmit, write, click, getByText } = setup();
		write("D", "Lastname");
		write("Email", "Email");
		click("Create");

		await waitFor(() => {
			expect(getByText("Too short")).toBeInTheDocument();
			expect(getByText("Required")).toBeInTheDocument();
			expect(getByText("Invalid email")).toBeInTheDocument();
		});
		await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled());
	});
});
