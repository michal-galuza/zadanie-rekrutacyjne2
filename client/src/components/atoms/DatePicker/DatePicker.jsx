import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./DatePicker.styles";

function CustomWrapper({ value, onClick }, ref) {
	return (
		<Button name={name} type="button" onClick={onClick} ref={ref}>
			{value}
		</Button>
	);
}

export default function Date({
	name = "DatePicker",
	value = new Date(),
	onChange,
}) {
	const CustomInput = forwardRef(CustomWrapper);
	return (
		<DatePicker
			selected={value}
			onChange={(val) => onChange({ target: { value: val, name } })}
			customInput={<CustomInput />}
		/>
	);
}
