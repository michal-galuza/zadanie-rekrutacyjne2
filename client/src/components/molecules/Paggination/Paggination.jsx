import { PagginationItem } from "../../atoms";
import { Wrapper } from "./Paggiation.styles";
export default function Paggiation({
	totalCount,
	actual,
	limit = 10,
	onClick,
}) {
	return (
		<Wrapper>
			{[...Array(Math.ceil(totalCount / limit)).keys()].map((item) => (
				<PagginationItem
					isActive={item === actual}
					onClick={onClick}
					key={`paggination${item}`}
					value={item}
				/>
			))}
		</Wrapper>
	);
}
