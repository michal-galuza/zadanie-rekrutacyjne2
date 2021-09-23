import moment from "moment";
import { Button } from "../../atoms";
import { Date, Row } from "./EventRow.styles";
export default function EventRow({
	firstname,
	lastname,
	email,
	date,
	onDelete,
	index,
}) {
	return (
		<Row index={index}>
			<div>
				<p>{firstname}</p>
				<p>{lastname}</p>
				<p>{email}</p>
			</div>{" "}
			<Date>{moment(date).format("DD-MM-YYYY HH:mm")}</Date>
			<Button
				title="Delete"
				text="X"
				onClick={onDelete}
				type="button"
				additionalStyles={{
					background: "transparent",
					color: "red",
					width: "35px",
					height: "35px",
				}}
			/>
		</Row>
	);
}
