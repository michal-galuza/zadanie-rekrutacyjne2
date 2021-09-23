import { cleanup, render, screen, waitFor } from "@testing-library/react";
import moment from "moment";
import { ThemeProvider } from "styled-components";
import theme from "../../../styles/Theme.styles";
import EventRow from "./EventRow";
import userEvent from "@testing-library/user-event";

describe("EventRow ", () => {
	const eventMock = {
		id: "Random_id",
		firstname: "Michal",
		lastname: "Galuza",
		email: "michal.galuza77@gmail.com",
		date: new Date(),
	};
	const onDelete = jest.fn();
	afterEach(cleanup);
	it("Should render row", async () => {
		const { getByText } = render(
			<ThemeProvider theme={theme}>
				<EventRow {...eventMock} onDelete={onDelete} />
			</ThemeProvider>,
		);
		expect(getByText(eventMock.firstname)).toBeInTheDocument();
		expect(getByText(eventMock.lastname)).toBeInTheDocument();
		expect(getByText(eventMock.email)).toBeInTheDocument();
		expect(
			getByText(moment(eventMock.date).format("DD-MM-YYYY HH:mm")),
		).toBeInTheDocument();
		expect(getByText("X")).toBeInTheDocument();
	});
	it("Should trigger onDelte function", async () => {
		render(
			<ThemeProvider theme={theme}>
				<EventRow {...eventMock} onDelete={onDelete} />
			</ThemeProvider>,
		);
		userEvent.click(screen.getByText("X"));
		await waitFor(() => expect(onDelete).toHaveBeenCalled());
	});
});
