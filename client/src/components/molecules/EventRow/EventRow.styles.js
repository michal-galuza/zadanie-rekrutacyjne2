import styled from "styled-components";

export const Row = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 140px 40px;
	grid-template-rows: 100%;

	align-items: center;
	text-align: center;
	color: ${({ theme }) => theme.colors.white};
	background: ${({ theme, index }) =>
		theme.backgrounds[index % 2 ? "row2" : "row1"]};
	padding: 5px 10px;
	border: 1px solid ${({ theme }) => theme.colors.white};
	font-size: 0.9rem;

	div {
		color: inherit;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		color: inherit;
		flex-direction: row;
		text-align: left;
		p {
			margin: 3px 5px;
			color: inherit;
			word-break: break-all;
			width: auto;
		}
	}
	@media (max-width: 600px) {
		padding: 5px 2px;
	}
`;
export const Date = styled.p`
	width: 100%;
	color: inherit;
`;
