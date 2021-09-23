import { EventsService } from "./../services/events.service";
import { FindAllEventsDto } from "./../dto/find-all-events.dto";
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { CreateEventDto } from "../dto/create-event.dto";
import { UpdateEventDto } from "../dto/update-event.dto";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
@ApiTags("events")
@Controller("events")
export class EventsController {
	constructor(private eventsService: EventsService) {}
	@ApiOperation({ summary: "Create event" })
	@HttpCode(200)
	@Post()
	create(@Body() createUserDto: CreateEventDto) {
		return this.eventsService.create(createUserDto);
	}

	@ApiOperation({ summary: "List events" })
	@HttpCode(200)
	@ApiQuery({
		name: "limit",
		type: Number,
		required: false,
	})
	@ApiQuery({
		name: "offset",
		type: Number,
		required: false,
	})
	@Get()
	findAll(@Query() dto: FindAllEventsDto) {
		return this.eventsService.findAll(dto);
	}

	@ApiOperation({ summary: "Update event" })
	@HttpCode(200)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateEventDto) {
		return this.eventsService.update(id, updateUserDto);
	}

	@ApiOperation({ summary: "Remove event" })
	@HttpCode(200)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.eventsService.remove(id);
	}
}
