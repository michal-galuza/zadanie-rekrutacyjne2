import { Content, ErrorMsg, LabelText, Wrapper } from "./Label.styles";

export default function Label({
	children,
	label,
	errorMsg,
	additionalStyles = {},
}) {
	return (
		<Wrapper style={{ ...additionalStyles }}>
			<LabelText>{label}</LabelText>
			<ErrorMsg>{errorMsg}</ErrorMsg>
			<Content> {children}</Content>
		</Wrapper>
	);
}
