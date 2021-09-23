import styled from "styled-components";

export const Btn = styled.button`
	width: 200px;
	height: 40px;
	font-size: 1.1rem;
	color: ${({ theme }) => theme.colors.white};
	background: ${({ theme }) => theme.backgrounds.btn};
`;
