import { EventsModule } from "./modules/events.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Event } from "./models/event.model";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${process.env.NODE_ENV}`,
			cache: true,
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				dialect: "postgres",
				host: configService.get("DB_HOST"),
				port: +configService.get("DB_PORT"),
				username: configService.get("DB_USER"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_NAME"),
				models: [Event],
				autoLoadModels: true,
				sync: { force: false },
				logging: false,
			}),
			inject: [ConfigService],
		}),

		EventsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
