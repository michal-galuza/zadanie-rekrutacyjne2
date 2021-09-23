import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: 100%;
	justify-items: center;
	align-items: center;
	color: ${({ theme }) => theme.colors.white};
	h2 {
		color: inherit;
	}
	@media (max-width: 900px) {
		grid-template-columns: 100%;
		grid-template-rows: auto auto;
	}
`;
