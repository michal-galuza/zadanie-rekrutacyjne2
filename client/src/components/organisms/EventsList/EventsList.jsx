import { Title } from "../../atoms";
import { EventRow, Paggination } from "../../molecules";
import { ScrollWrapper, Wrapper } from "./EventsList.styles";

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
			<ScrollWrapper>
				{events.length &&
					events.map((item, index) => (
						<EventRow
							onDelete={() => onDelete(item.id)}
							key={item.id}
							{...item}
							index={index}
						/>
					))}
			</ScrollWrapper>
			<Paggination
				totalCount={totalCount}
				actual={offset}
				onClick={onOffsetChange}
			/>
		</Wrapper>
	);
}
