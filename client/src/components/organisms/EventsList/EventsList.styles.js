import styled from "styled-components";

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 45px minmax(300px, auto) 45px;
	background: transparent;
	max-width: 700px;
	width: 100%;
	background: ${({ theme }) => theme.backgrounds.main};

	@media (max-width: 900px) {
		margin: 45px;
	}
	@media (min-width: 900px) {
		grid-template-rows: 45px minmax(300px, 80vh) 45px;
	}
`;
export const Status = styled.h1`
	@media (max-width: 900px) {
		position: sticky;
		top: 0;
		left: 0;
		background: ${({ theme }) => theme.backgrounds.main};
	}
`;
export const ScrollWrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: auto;
`;
