import { Title } from "../../atoms";
import { EventRow, Paggination } from "../../molecules";
import { Wrapper } from "./EventsList.styles";

export default function EventsList({
	onDelete,
	events = [],
	totalCount,
	onOffsetChange,
	offset,
	removeStatus: { isLoading, error, isSuccess },
}) {
	if (!events.length) {
		return <div></div>;
	}
	return (
		<Wrapper>
			<Title
				txt={
					isLoading
						? "Deleting"
						: isSuccess
						? "Deleted"
						: error
						? error.data?.message?.join(", ") ||
						  "Something went wrong while deleting event"
						: "Events"
				}
			/>
			<div>
				{events.length &&
					events.map((item, index) => (
						<EventRow
							onDelete={() => onDelete(item.id)}
							key={item.id}
							{...item}
							index={index}
						/>
					))}
			</div>
			<Paggination
				totalCount={totalCount}
				actual={offset}
				onClick={onOffsetChange}
			/>
		</Wrapper>
	);
}
