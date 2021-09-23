import styled from "styled-components";

export const Button = styled.button`
	width: 100%;
	height: 100%;
	text-align: left;
	padding: 0 5px;
	background: inherit;
	border: 1px solid white;
	color: ${({ theme }) => theme.colors.white};
	min-height: 40px;
`;
