import styled from "styled-components";

export const Wrapper = styled.form`
	background: ${({ theme }) => theme.backgrounds.eventForm};
	width: 350px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 25px 10px;

	label {
		margin: 5px 0;
	}

	@media (max-width: 900px) {
		margin-top: 25px;
	}
`;
