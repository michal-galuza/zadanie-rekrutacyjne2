export const mockEvents = [
	{
		id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
		firstname: "John",
		lastname: "Doe",
		email: "john.doe@mail.com",
		date: new Date("2021-01-05").toISOString(),
		createdAt: new Date("2021-01-05").toISOString(),
		updatedAt: new Date("2021-01-05").toISOString(),
	},
	{
		id: "9e0593ab-97c6-4ead-a927-1d816d186b69",
		firstname: "John",
		lastname: "Doe",
		email: "john.doe@mail.com",
		date: new Date("2021-01-06").toISOString(),
		createdAt: new Date("2021-01-06").toISOString(),
		updatedAt: new Date("2021-01-06").toISOString(),
	},
];
const mockEventRepository = {
	findAndCountAll: () => ({ rows: mockEvents, count: mockEvents.length }),
	create: (dto) => ({
		id: "ab0593ab-97c6-4ead-a927-1d816d186b69",
		date: new Date(),
		createdAt: new Date("2021-09-17T18:57:27.411Z"),
		updatedAt: new Date("2021-09-17T18:57:27.411Z"),
		...dto,
	}),
	findOne: jest.fn(),
	findByPk: jest.fn(),
};
export default mockEventRepository;
