import styled from "styled-components";

export const Wrapper = styled.label`
	display: grid;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	flex-wrap: nowrap;
	background-color: ${({ theme }) => theme.backgrounds.label};
	padding: 5px 10px;
	min-width: 200px;
	width: 100%;
	color: ${({ theme }) => theme.colors.white};
`;
export const ErrorMsg = styled.p`
	color: ${({ theme }) => theme.colors.error};

	width: 100%;
	height: auto;
`;
export const LabelText = styled.p`
	color: ${({ theme }) => theme.colors.white};
`;
export const Content = styled.div`
	width: 100%;
	height: 40px;
	margin-top: 5px;
`;
