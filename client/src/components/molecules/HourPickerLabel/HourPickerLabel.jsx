import { HourPicker, Label } from "../../atoms";

export default function HourPickerLabel({
	label = "Hour",
	errorMsg,
	value = "12:30",
	onChange,
	name,
}) {
	return (
		<Label label={label} errorMsg={errorMsg}>
			<HourPicker name={name} value={value} onChange={onChange} />
		</Label>
	);
}
