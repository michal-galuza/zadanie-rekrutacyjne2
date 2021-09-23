import {
	IsDate,
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateEventDto {
	@ApiProperty({ required: false, example: "John" })
	@IsOptional()
	@IsString({ message: "Firstname  is incorrect" })
	@MinLength(2, { message: "Firstname is too short" })
	@MaxLength(200, { message: "Firstname is too long" })
	readonly firstname?: string;
	@ApiProperty({ required: false, example: "Doe" })
	@IsOptional()
	@IsString({ message: "Lastname  is incorrect" })
	@MinLength(2, { message: "Lastname is too short" })
	@MaxLength(200, { message: "Lastname is too long" })
	readonly lastname?: string;
	@ApiProperty({ required: false, example: "mail@mail.com" })
	@IsOptional()
	@IsString({ message: "Email is incorrect" })
	@IsEmail({}, { message: "Email is incorrect" })
	@MinLength(3, { message: "Email is too short" })
	@MaxLength(200, { message: "Email is too long" })
	readonly email?: string;
	@ApiProperty({ required: false, example: new Date() })
	@IsOptional()
	@IsDate({ message: "Date is incorrect" })
	readonly date?: Date;
}
