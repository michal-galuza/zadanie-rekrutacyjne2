import styled from "styled-components";
const placeholderOpacity = 0.85;
export const Input = styled.input`
	width: 100%;
	height: 100%;
	padding: 0 5px;
	background: inherit;
	border: 1px solid white;
	color: inherit;
	/* Chrome, Firefox, Opera, Safari 10.1+ */
	::placeholder {
		color: ${({ theme }) => theme.colors.white};
		opacity: ${placeholderOpacity};
	}
	/* Internet Explorer 10-11 */
	:-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.white};
		opacity: ${placeholderOpacity};
	}
	/* Microsoft Edge */
	::-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.white};
		opacity: ${placeholderOpacity};
	}
`;
