import styled from "styled-components";
export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 60px auto;
	background-color: ${({ theme }) => theme.backgrounds.main};
`;
export const Header = styled.header`
	width: 100%;
	padding: 0 25px;
	background-color: ${({ theme }) => theme.backgrounds.header};
	display: flex;
	justify-content: space-between;
	align-items: center;
	h1 {
		font-size: 2.2rem;
		color: ${({ theme }) => theme.colors.white};
	}
`;
export const Main = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.colors.white};
`;
