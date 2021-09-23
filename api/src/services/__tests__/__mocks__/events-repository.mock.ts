import { CreateEventDto } from "../../../dto/create-event.dto";

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
		date: new Date("2021-01-06"),
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
const mockEventsRepository = {
	create: jest.fn().mockImplementation((dto) => ({
		...dto,
		createdAt: new Date(),
		updatedAt: new Date(),
		id: "1e0613ab-97c6-4ead-a927-1d81xd1b6b69",
	})),

	findByPk: jest
		.fn()
		.mockImplementation((id: string) => events.find((item) => item.id === id)),
	findOne: jest.fn(({ where }) =>
		events.find(
			(item) =>
				+item.date === +where.date &&
				item.email === where.email &&
				item.firstname === where.firstname &&
				item.lastname === where.lastname,
		),
	),
	findAndCountAll: jest.fn().mockImplementation((dto) => ({
		rows: events,
		count: events.length,
	})),
};
export default mockEventsRepository;
