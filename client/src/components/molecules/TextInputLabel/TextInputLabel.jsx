import { TextInput, Label } from "../../atoms";

export default function TextInputLabel({
	onChange,
	value,
	additionalStyles = {},
	additionalStylesInput = {},
	name = "",
	placeholder = "",
	label = "",
	errorMsg = "",
	required,
	onBlur,
}) {
	return (
		<Label label={label} errorMsg={errorMsg} style={{ ...additionalStyles }}>
			<TextInput
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				name={name}
				additionalStyles={additionalStylesInput}
				placeholder={placeholder}
				required={required}
			/>
		</Label>
	);
}
