import { Btn } from "./Button.styles";

export default function Button({
	text,
	type = "button",
	onClick,
	additionalStyles,
	title = "",
	disabled = false,
}) {
	return (
		<Btn
			title={title}
			type={type}
			onClick={onClick}
			style={{ ...additionalStyles }}
			disabled={disabled}
		>
			{text}
		</Btn>
	);
}
