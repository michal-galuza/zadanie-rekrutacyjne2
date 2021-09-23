import styled from "styled-components";
export const PagginationBtn = styled.button`
	background: transparent;
	color: white;
	width: 20px;
	font-size: 1.1rem;
	font-weight: bold;
	background: ${({ theme, isActive }) =>
		theme.backgrounds[isActive ? "row1" : "row2"]};
`;
