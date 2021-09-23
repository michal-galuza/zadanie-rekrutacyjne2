import { DatePicker, Label } from "../../atoms";

export default function TextInputLabel({
	onChange,
	value,
	additionalStyles = {},
	label = "",
	errorMsg = "",
	name,
}) {
	return (
		<Label label={label} errorMsg={errorMsg} style={{ ...additionalStyles }}>
			<DatePicker name={name} onChange={onChange} value={value} />
		</Label>
	);
}
