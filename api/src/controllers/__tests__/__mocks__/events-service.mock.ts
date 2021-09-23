import { CreateEventDto } from "../../../dto/create-event.dto";
import { FindAllEventsDto } from "../../../dto/find-all-events.dto";
import { UpdateEventDto } from "../../../dto/update-event.dto";

const events = [
	{
		id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
		firstname: "John",
		lastname: "Doe",
		email: "john.doe@mail.com",
		date: new Date("2021-01-05"),
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "9e0593ab-97c6-4ead-a927-1d816d186b69",
		firstname: "John",
		lastname: "Doe",
		email: "john.doe@mail.com",
		date: new Date("2021-01-01"),
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
const mockEventService = {
	create: jest.fn((dto: CreateEventDto) => ({
		statusCode: 200,
		event: {
			...dto,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
		},
	})),
	findAll: jest.fn((dto: FindAllEventsDto) => ({
		statusCode: 200,
		events,
		totalCount: 2,
		params: dto,
	})),
	update: jest.fn((id: string, dto: UpdateEventDto) => {
		const index = events.findIndex((item) => item.id === id);
		events[index] = { ...events[index], ...dto };
		return { statusCode: 200, event: events[index] };
	}),
	remove: jest.fn((id: string) => {
		const index = events.findIndex((item) => item.id === id);

		return { statusCode: 200, deltedEvent: events.splice(index, 1)[0] };
	}),
};
export default mockEventService;
