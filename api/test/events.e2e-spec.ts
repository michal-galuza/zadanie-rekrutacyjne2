import { getModelToken } from "@nestjs/sequelize";
import { EventsService } from "./../src/services/events.service";
import { EventsModule } from "./../src/modules/events.module";
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Event } from "../src/models/event.model";
import mockEventRepository, {
	mockEvents,
} from "./__mocks__/mockEventRepository.mock";
import { response } from "express";

describe("Events Controller (e2e)", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [EventsModule],
		})
			.overrideProvider(getModelToken(Event))
			.useValue(mockEventRepository)
			.compile();

		app = moduleRef.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				transformOptions: { enableImplicitConversion: true },
			}),
		);
		await app.init();
	});

	it("/ (GET)", () => {
		return request(app.getHttpServer())
			.get("/events")
			.query({ limit: 400, offset: 40 })
			.expect("Content-type", /json/)
			.expect(200)
			.expect({
				statusCode: 200,
				events: mockEvents,
				totalCount: mockEvents.length,
				params: {
					limit: 200,
					offset: 40,
				},
			});
	});
	it("/ (GET) ->should return 400", () => {
		return request(app.getHttpServer())
			.get("/events")
			.expect("Content-type", /json/)
			.query({ limit: "4adacz2" })
			.expect(400);
	});

	it("/ (POST) ", async () => {
		const dto = {
			firstname: "John",
			lastname: "Doe",
			date: new Date("2018-01-02"),
			email: "john.doe@mail.com",
		};
		mockEventRepository.findOne.mockResolvedValue(null);
		const req = await request(app.getHttpServer())
			.post("/events")
			.send(dto)
			.expect("Content-type", /json/)
			.expect(200);
		expect(req.body.event).toEqual({
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
			id: expect.any(String),
			...dto,
			date: dto.date.toISOString(),
		});
	});
	it("/ (POST) --> should return 400", async () => {
		return request(app.getHttpServer())
			.post("/events")
			.expect("Content-type", /json/)
			.expect(400);
	});
	it("/ (POST) --> should return 400 ", async () => {
		return request(app.getHttpServer())
			.post("/events")
			.send({
				firstname: "J",
				lastname: "D",
				date: "ASDASDASD",
				email: "john.doe@mail.com",
			})
			.expect("Content-type", /json/)
			.expect(400, {
				statusCode: 400,
				message: [
					"Firstname is too short",
					"Lastname is too short",
					"Date is incorrect",
				],
				error: "Bad Request",
			});
	});
	it("/:id (PATCH) ", async () => {
		const initialEvent = {
			id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@mail.com",
			date: new Date("2021-01-05"),
			createdAt: new Date("2021-01-05"),
			updatedAt: new Date("2021-01-05"),
			update: (dto) => {
				Object.keys(dto).map((key) => (initialEvent[key] = dto[key]));
			},
		};
		const dto = { firstname: "Pablo" };

		mockEventRepository.findByPk.mockResolvedValue(initialEvent);

		return request(app.getHttpServer())
			.patch("/events/2872e508-2914-47b0-ae42-f81cfefd7dd7")
			.send({
				firstname: "John",
				lastname: "Doe",
				email: "john.doe@mail.com",
				date: new Date("2021-01-05").toISOString(),
			})
			.expect(200, {
				statusCode: 200,
				event: {
					id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
					firstname: "John",
					lastname: "Doe",
					email: "john.doe@mail.com",
					date: "2021-01-05T00:00:00.000Z",
					createdAt: "2021-01-05T00:00:00.000Z",
					updatedAt: "2021-01-05T00:00:00.000Z",
				},
			});
	});
	it("/:id (PATCH) --> should return 400 duplicated", async () => {
		const initialEvent = {
			id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@mail.com",
			date: new Date("2021-01-05"),
			createdAt: new Date("2021-01-05"),
			updatedAt: new Date("2021-01-05"),
			update: (dto) => {
				Object.keys(dto).map((key) => (initialEvent[key] = dto[key]));
			},
		};
		const dto = { firstname: "Pablo" };

		mockEventRepository.findByPk.mockResolvedValue(initialEvent);
		mockEventRepository.findOne.mockResolvedValue(true);
		return request(app.getHttpServer())
			.patch("/events/2872e508-2914-47b0-ae42-f81cfefd7dd7")
			.send({
				firstname: "John",
				lastname: "Doe",
				email: "john.doe@mail.com",
				date: new Date("2021-01-05").toISOString(),
			})
			.expect(400, {
				statusCode: 400,
				message: ["An identical event already exists"],
			});
	});
	it("/:id (PATCH) --> should return 404 event not found", async () => {
		mockEventRepository.findByPk.mockResolvedValue(null);
		return request(app.getHttpServer())
			.patch("/events/2872e508-2914-47b0-ae42-f81cfefd7dd7")
			.send({
				firstname: "John",
				lastname: "Doe",
				email: "john.doe@mail.com",
				date: new Date("2021-01-05").toISOString(),
			})
			.expect(404);
	});
	it("/:id (PATCH) --> should return 400 ", async () => {
		return request(app.getHttpServer())
			.post("/events")
			.send({
				firstname: "J",
				lastname: "D",
				date: "ASDASDASD",
				email: "john.doe@mail.com",
			})
			.expect("Content-type", /json/)
			.expect(400, {
				statusCode: 400,
				message: [
					"Firstname is too short",
					"Lastname is too short",
					"Date is incorrect",
				],
				error: "Bad Request",
			});
	});
	it("/:id (DELETE) ", async () => {
		mockEventRepository.findByPk.mockResolvedValue({
			id: "2872e508-2914-47b0-ae42-f81cfefd7dd7",
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@mail.com",
			date: new Date("2021-01-05"),
			createdAt: new Date("2021-01-05"),
			updatedAt: new Date("2021-01-05"),
			destroy: () => true,
		});
		return request(app.getHttpServer())
			.delete("/events/2872e508-2914-47b0-ae42-f81cfefd7dd7")
			.expect(200);
	});
	it("/:id (DELETE) --> should return 404 ", async () => {
		mockEventRepository.findByPk.mockResolvedValue(null);
		return request(app.getHttpServer())
			.delete("/events/2872e508-2914-47b0-ae42-f81cfefd7dd7")
			.expect(404);
	});
	afterAll(async () => {
		await app.close();
	});
});
