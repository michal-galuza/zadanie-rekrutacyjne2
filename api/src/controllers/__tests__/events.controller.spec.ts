import { getModelToken } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { Event } from "../../models/event.model";
import { EventsService } from "./../../services/events.service";
import { EventsController } from "./../events.controller";
import mockEventService from "./__mocks__/events-service.mock";
describe("Events controller", () => {
	let controller: EventsController;
	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EventsController],
			providers: [
				EventsService,
				{
					provide: getModelToken(Event),
					useValue: Event,
				},
			],
		})
			.overrideProvider(EventsService)
			.useValue(mockEventService)
			.compile();
		controller = module.get<EventsController>(EventsController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
	it("should create a event", async () => {
		const dto = {
			firstname: "John",
			lastname: "Doe",
			date: new Date(),
			email: "john.doe@mail.com",
		};
		const newEvent = await controller.create(dto);
		expect(mockEventService.create).toHaveBeenCalled();
		expect(mockEventService.create).toHaveBeenCalledWith(dto);
		expect(newEvent.statusCode).toEqual(expect.any(Number));
		expect(newEvent.event).toEqual({
			...dto,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			id: expect.any(String),
		});
	});

	it("should list events", async () => {
		const dto = { offset: 0, limit: 10 };

		const eventsList = await controller.findAll(dto);
		expect(mockEventService.findAll).toHaveBeenCalled();
		expect(mockEventService.findAll).toHaveBeenCalledWith(dto);
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

	it("should update event", async () => {
		const dto = {
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@mail.com",
			date: new Date(),
		};
		const id = "2872e508-2914-47b0-ae42-f81cfefd7dd7";
		const updatedEvent = await controller.update(id, dto);

		expect(mockEventService.update).toHaveBeenCalled();
		expect(mockEventService.update).toHaveBeenCalledWith(id, dto);

		expect(updatedEvent.statusCode).toEqual(200);
		expect(updatedEvent.event).toEqual({
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			date: expect.any(Date),
			id: expect.any(String),
			firstname: expect.any(String),
			lastname: expect.any(String),
			email: expect.any(String),
		});
	});
	it("should remove event", async () => {
		const id = "2872e508-2914-47b0-ae42-f81cfefd7dd7";
		const removedEvent = await controller.remove(id);
		expect(mockEventService.remove).toHaveBeenCalled();
		expect(mockEventService.remove).toHaveBeenCalledWith(id);
		expect(removedEvent.statusCode).toEqual(200);
		expect(removedEvent.deltedEvent).toEqual({
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			date: expect.any(Date),
			id: expect.any(String),
			firstname: expect.any(String),
			lastname: expect.any(String),
			email: expect.any(String),
		});
	});
});
