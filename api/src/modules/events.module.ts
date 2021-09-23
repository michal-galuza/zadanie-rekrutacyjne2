import { SequelizeModule } from "@nestjs/sequelize";
import { EventsService } from "./../services/events.service";
import { EventsController } from "./../controllers/events.controller";
import { Module } from "@nestjs/common";
import { Event } from "../models/event.model";
@Module({
	controllers: [EventsController],
	providers: [EventsService],
	imports: [SequelizeModule.forFeature([Event])],
	exports: [EventsService],
})
export class EventsModule {}
