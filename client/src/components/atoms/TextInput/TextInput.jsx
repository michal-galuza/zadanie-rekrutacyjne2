import { Input } from "./TextInput.styles";

export default function TextInput({
	onChange,
	value,
	additionalStyles = {},
	name = "",
	placeholder = "",
	required,
	onBlur,
}) {
	return (
		<Input
			type="text"
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			name={name}
			style={{ ...additionalStyles }}
			placeholder={placeholder}
			required={required}
		/>
	);
}
