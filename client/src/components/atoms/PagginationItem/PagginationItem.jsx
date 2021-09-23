import { PagginationBtn } from "./PagginationItem.styles";

export default function PaggiationItem({ isActive, value, onClick }) {
	return (
		<PagginationBtn
			type="button"
			isActive={isActive}
			value={value}
			onClick={onClick}
		>
			{value + 1}
		</PagginationBtn>
	);
}
