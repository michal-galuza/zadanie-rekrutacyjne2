import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import theme from "../../../styles/Theme.styles";
import EventsList from "./EventsList";

function setup(props = {}) {
	const onOffsetChange = jest.fn();
	const onDelete = jest.fn();
	const eventsProps = {
		events: [
			{
				id: "Random_id",
				firstname: "Michal",
				lastname: "Galuza",
				email: "michal.galuza77@gmail.com",
				date: new Date(),
			},
		],
		offset: 0,
		actual: 0,
		totalCount: 20,
		removeStatus: {
			isLoading: false,
			error: null,
			isSuccess: false,
		},
		...props,
	};
	const utils = render(
		<ThemeProvider theme={theme}>
			<EventsList
				{...eventsProps}
				onOffsetChange={onOffsetChange}
				onDelete={onDelete}
			/>
		</ThemeProvider>,
	);
	const getByText = (text) => screen.getByText(text);
	const click = (text) => userEvent.click(screen.getByText(text));
	return { utils, getByText, eventsProps, click, onDelete, onOffsetChange };
}

describe("EventList (ORGANISM)", () => {
	it("Should render events list", async () => {
		const utils = setup();
		expect(utils.getByText("1")).toBeInTheDocument();
		expect(utils.getByText("Events")).toBeInTheDocument();
		expect(utils.getByText("Michal")).toBeInTheDocument();
		expect(utils.getByText("Galuza")).toBeInTheDocument();
		expect(utils.getByText("michal.galuza77@gmail.com")).toBeInTheDocument();
		cleanup();
	});
	it("should change the page", async () => {
		const utils = setup();
		utils.click("2");
		await waitFor(() => expect(utils.onOffsetChange).toHaveBeenCalled());
		cleanup();
	});
	it("should delete event", async () => {
		const utils = setup();
		utils.click("X");
		await waitFor(() => expect(utils.onDelete).toHaveBeenCalled());
		cleanup();
	});
});
