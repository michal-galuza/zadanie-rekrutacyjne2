import styled from "styled-components";

export const H1 = styled.h1`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.colors.white};
	@media (max-width: 900px) {
		position: sticky;
		top: 0;
		left: 0;
		background: inherit;
		width: 100%;
		text-align: center;
		min-height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
