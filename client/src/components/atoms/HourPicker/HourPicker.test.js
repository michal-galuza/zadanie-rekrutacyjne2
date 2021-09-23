import { render, cleanup, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import HourPicker from "./HourPicker";
import theme from "../../../styles/Theme.styles";
import userEvent from "@testing-library/user-event";

function setup(props = {}) {
	const hourPickerProps = {
		value: "12:30",
		name: "hourPicker",
		...props,
	};
	const onChange = jest.fn();
	const utils = render(
		<ThemeProvider theme={theme}>
			<HourPicker {...hourPickerProps} onChange={onChange} />
		</ThemeProvider>,
	);
	const hourPicker = utils.getByDisplayValue(
		hourPickerProps.value.split(":")[0],
	);
	const minutePicker = utils.getByDisplayValue(
		hourPickerProps.value.split(":")[1],
	);
	const changeTime = (optionValue) => {
		userEvent.selectOptions(hourPicker, "20");
		userEvent.selectOptions(minutePicker, "50");
	};
	return {
		hourPickerProps,
		onChange,
		utils,
		hourPicker,
		minutePicker,
		changeTime,
	};
}

describe("HourPicker (ATOM)", () => {
	it("Should render hourpicker", async () => {
		const utils = setup();
		expect(utils.hourPicker).toBeInTheDocument();
		expect(utils.minutePicker).toBeInTheDocument();
		cleanup();
	});
	it("Should change time", async () => {
		const utils = setup();
		utils.changeTime();

		await waitFor(() => expect(utils.onChange).toHaveBeenCalledTimes(2));
		cleanup();
	});
});
