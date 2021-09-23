import { UpdateEventDto } from "./../dto/update-event.dto";
import { FindAllEventsDto } from "./../dto/find-all-events.dto";
import { CreateEventDto } from "./../dto/create-event.dto";
import { Op } from "sequelize";
import {
	HttpCode,
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";
import { Event } from "../models/event.model";
import { InjectModel } from "@nestjs/sequelize";
import { CommonException } from "../exceptions/common.exception";

@Injectable()
export class EventsService {
	constructor(@InjectModel(Event) private eventRepo: typeof Event) {}

	public async findDuplicate(dto: CreateEventDto, id: string | null = null) {
		return this.eventRepo.findOne({
			where: {
				firstname: dto.firstname,
				lastname: dto.lastname,
				date: dto.date,
				email: dto.email,
				id: { [Op.not]: id },
			},
		});
	}
	public async findById(id: string) {
		return this.eventRepo.findByPk(id);
	}
	public async create(dto: CreateEventDto) {
		const isDuplicated = await this.findDuplicate(dto);

		if (isDuplicated) {
			throw new CommonException(
				"An identical event already exists",
				HttpStatus.BAD_REQUEST,
			);
		}
		const newEvent = await this.eventRepo.create(
			{
				...dto,
				date: dto.date,
			},
			{ fields: ["firstname", "lastname", "email", "date"] },
		);
		return { statusCode: HttpStatus.OK, event: newEvent };
	}
	public async findAll(dto: FindAllEventsDto) {
		const offset: number = +dto.offset || 0;
		const limit: number = +dto.limit || 10;
		const events = await this.eventRepo.findAndCountAll({
			limit: limit > 200 ? 200 : limit,
			offset,
			order: [["date", "DESC"]],
		});
		return {
			statusCode: HttpStatus.OK,
			events: events.rows,
			totalCount: events.count,
			params: {
				limit: limit > 200 ? 200 : limit,
				offset,
			},
		};
	}
	public async update(id: string, dto: UpdateEventDto) {
		const event = await this.findById(id);
		if (!event) {
			throw new CommonException("Event not found", HttpStatus.NOT_FOUND);
		}
		const isDuplicated = await this.findDuplicate(
			{
				...event,
				...dto,
			},
			event.id,
		);
		if (isDuplicated) {
			throw new CommonException(
				"An identical event already exists",
				HttpStatus.BAD_REQUEST,
			);
		}

		await event.update(dto, {
			fields: ["firstname", "lastname", "email", "date"],
		});

		return { statusCode: HttpStatus.OK, event: event };
	}
	public async remove(id: string) {
		const event = await this.findById(id);
		if (!event) {
			throw new CommonException("Event not found", HttpStatus.NOT_FOUND);
		}
		await event.destroy();
		return { statusCode: HttpStatus.OK, deltedEvent: event };
	}
}
