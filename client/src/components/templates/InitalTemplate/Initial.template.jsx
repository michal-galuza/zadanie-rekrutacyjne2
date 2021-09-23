import { Header, Main, Wrapper } from "./Initial.styles";

export default function InitialTemplate({ children }) {
	return (
		<Wrapper>
			<Header>
				<h1>Events-app</h1>
			</Header>
			<Main>{children}</Main>
		</Wrapper>
	);
}
