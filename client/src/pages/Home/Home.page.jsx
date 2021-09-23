import moment from "moment";
import { useEffect, useState } from "react";
import { AddNewEventForm, EventsList } from "../../components/organisms";
import { InitialTemplate } from "../../components/templates";
import {
	useCreateEventMutation,
	useGetEventsQuery,
	useRemoveEventMutation,
} from "../../services";
import { Wrapper } from "./Home.styles";

export default function Home() {
	const [offset, setOffset] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const { data, error, isLoading, refetch } = useGetEventsQuery(offset, {
		refetchOnMountOrArgChange: true,
	});
	const [create, createStatus] = useCreateEventMutation();
	const [remove, removeStatus] = useRemoveEventMutation();

	const handleOffsetChange = (e) => setOffset(+e.target.value);

	async function createEvent(data, actions) {
		const time = data.time.split(":");
		const date = moment(data.date)
			.set("hours", time[0])
			.set("minutes", time[1])
			.set("seconds", 1)
			.set("milliseconds", 1);
		const req = await create({ ...data, date: date.format() });
		if (req.data) {
			actions.resetForm();
			refetch();
		}
	}

	async function removeEvent(id) {
		const res = await remove(id);
		if (res.data?.statusCode === 200) {
			if ((totalCount - 1) % 10 === 0) {
				setOffset((prev) => (prev - 1 < 0 ? 0 : prev - 1));
			}
			refetch();
		}
	}
	useEffect(() => {
		if (data) {
			setTotalCount(data.totalCount);
		}
	}, [setTotalCount, data]);
	return (
		<InitialTemplate>
			<Wrapper>
				<AddNewEventForm status={createStatus} onSubmit={createEvent} />
				{isLoading && <h2>Loading</h2>}
				{error && (
					<h2>
						{error.data?.message.join(", ") ||
							"Something went wrong while downloading events"}
					</h2>
				)}
				{data && (
					<EventsList
						onOffsetChange={handleOffsetChange}
						totalCount={totalCount}
						onDelete={removeEvent}
						events={data.events}
						offset={offset}
						removeStatus={removeStatus}
					/>
				)}
			</Wrapper>
		</InitialTemplate>
	);
}
