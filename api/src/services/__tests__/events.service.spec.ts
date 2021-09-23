import { getModelToken } from "@nestjs/sequelize";
import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing";
import { Event } from "../../models/event.model";
import { EventsService } from "./../events.service";
import mockEventsRepository from "./__mocks__/events-repository.mock";
describe("EventsService", () => {
	let service: EventsService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EventsService,
				{
					provide: getModelToken(Event),
					useValue: mockEventsRepository,
				},
			],
		}).compile();
		service = module.get<EventsService>(EventsService);
	});
	it("should be defined", () => {
		expect(service).toBeDefined();
	});
	it("should create new event", async () => {
		const dto = {
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@mail.com",
			date: new Date("2021-01-09"),
		};
		const findDuplicateSpy = jest.spyOn(service, "findDuplicate");
		const create = await service.create(dto);
		expect(findDuplicateSpy).toHaveBeenCalledWith(dto);
		expect(create.statusCode).toEqual(200);
		expect(create.event).toEqual({
			...dto,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			id: expect.any(String),
		});
	});
	it("should find duplicated event", async () => {
		const dto = {
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@mail.com",
			date: new Date("2021-01-06"),
		};
		const duplicate = await service.findDuplicate(dto);
		expect(duplicate).toEqual({
			...dto,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			id: expect.any(String),
		});
	});
	it("should list events", async () => {
		const dto = { limit: 10, offset: 0 };
		const findAndCountAllSpy = jest.spyOn(
			mockEventsRepository,
			"findAndCountAll",
		);
		const eventsList = await service.findAll(dto);
		expect(findAndCountAllSpy).toHaveBeenCalled();
		expect(eventsList.statusCode).toEqual(200);
		expect(eventsList.params).toEqual(expect.objectContaining(dto));
		expect(eventsList.totalCount).toEqual(expect.any(Number));
		for (let i = 0; i < eventsList.events.length; i++) {
			expect(eventsList.events[i]).toEqual({
				date: expect.any(Date),
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
				id: expect.any(String),
				firstname: expect.any(String),
				lastname: expect.any(String),
				email: expect.any(String),
			});
		}
	});
	it("should find event by id", async () => {
		const id = "2872e508-2914-47b0-ae42-f81cfefd7dd7";
		expect(await service.findById(id)).toEqual({
			date: expect.any(Date),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			id: expect.any(String),
			firstname: expect.any(String),
			lastname: expect.any(String),
			email: expect.any(String),
		});
	});
	it("should remove event ", async () => {
		const id = "2872e508-2914-47b0-ae42-f81cfefd7dd7";
		mockEventsRepository.findByPk.mockResolvedValue({
			destroy: () => ({
				id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
				firstname: "John",
				lastname: "Doe",
				email: "john.doe@mail.com",
				date: new Date("2021-01-05"),
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
		});
		const remove = await service.remove(id);
		expect(mockEventsRepository.findByPk).toHaveBeenCalled();
		expect(remove.statusCode).toEqual(200);
		expect(remove.deltedEvent.destroy()).toEqual({
			date: expect.any(Date),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			id: expect.any(String),
			firstname: expect.any(String),
			lastname: expect.any(String),
			email: expect.any(String),
		});
	});
	it("should update event", async () => {
		const id = "2872e508-2914-47b0-ae42-f81cfefd7dd7";
		const dto = {
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@mail.com",
			date: new Date("2021-01-15"),
		};
		mockEventsRepository.findByPk.mockResolvedValue({
			update: (dto) => ({
				id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
				firstname: "John",
				lastname: "Doe",
				email: "john.doe@mail.com",
				date: new Date("2021-01-05"),
				createdAt: new Date("2021-01-05"),
				updatedAt: new Date("2021-01-05"),
				...dto,
			}),
		});
		const update = await service.update(id, dto);
		expect(mockEventsRepository.findByPk).toHaveBeenCalled();
		expect(update.event.update(dto)).toEqual({
			id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@mail.com",
			date: new Date("2021-01-05"),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			...dto,
		});
	});
});
