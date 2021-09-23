import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	background: inherit;
	border: 1px solid ${({ theme }) => theme.colors.white};
	display: flex;
	justify-content: flex-start;
	align-items: center;
	color: ${({ theme }) => theme.colors.white};
	padding-left: 5px;
	select {
		background: inherit;
		color: white;
		width: 45px;
		padding: 0 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='white'><polygon points='0,0 100,0 50,50'/></svg>")
			no-repeat;
		background-size: 12px;
		background-position: calc(100% - 10px) calc(100% + 2px);
		background-repeat: no-repeat;
		text-align: left;
		option {
			color: black;
			padding: 0 5px;
		}
	}
`;
