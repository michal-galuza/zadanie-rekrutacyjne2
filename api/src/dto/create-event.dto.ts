import { ApiProperty } from "@nestjs/swagger";
import {
	IsDate,
	IsEmail,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateEventDto {
	@ApiProperty({ example: "John" })
	@IsString({ message: "Firstname  is incorrect" })
	@MinLength(2, { message: "Firstname is too short" })
	@MaxLength(200, { message: "Firstname is too long" })
	readonly firstname: string;
	@ApiProperty({ example: "Doe" })
	@IsString({ message: "Lastname  is incorrect" })
	@MinLength(2, { message: "Lastname is too short" })
	@MaxLength(200, { message: "Lastname is too long" })
	readonly lastname: string;
	@ApiProperty({ example: "mail@mail.com" })
	@IsString({ message: "Email is incorrect" })
	@IsEmail({}, { message: "Email is incorrect" })
	@MinLength(3, { message: "Email is too short" })
	@MaxLength(200, { message: "Email is too long" })
	readonly email: string;
	@ApiProperty({ example: new Date() })
	@IsDate({ message: "Date is incorrect" })
	readonly date: Date;
}
