import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		}),
	);
	const configService = app.get(ConfigService);

	app.enableCors({
		origin: [
			configService.get("SERVER_DOMAIN"),
			configService.get("CLIENT_DOMAIN"),
			"http://192.168.8.100:3000",
		],
	});
	if (configService.get("NODE_ENV") !== "production") {
		const documentationConfig = new DocumentBuilder()
			.setTitle("Events APP")
			.setDescription("Documentation REST API")
			.setVersion("0.0.1")
			.build();
		const documentation = SwaggerModule.createDocument(
			app,
			documentationConfig,
		);
		SwaggerModule.setup("/documentation", app, documentation);
	}
	const PORT = +configService.get("PORT") || 5000;
	const NODE_ENV = configService.get("NODE_ENV");
	await app.listen(PORT, () =>
		console.log(`Server listen on ${PORT} | NODE_ENV=${NODE_ENV}`),
	);
}
bootstrap();
