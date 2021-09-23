import { HttpException } from "@nestjs/common";
export class CommonException extends HttpException {
	constructor(message: string, statusCode: number) {
		super({ statusCode, message: [message] }, statusCode);
	}
}
