import { H1 } from "./Title.styles";

export default function Title({ txt, additionalStyles = {} }) {
	return <H1 style={{ ...additionalStyles }}>{txt}</H1>;
}
