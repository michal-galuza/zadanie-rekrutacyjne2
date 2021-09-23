import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";
export class FindAllEventsDto {
	@ApiProperty({ default: 10, required: false, maximum: 200 })
	@IsOptional()
	@IsInt({ message: "The limit must be an integer" })
	@Min(0, { message: "Limit must bee equal greater than 0" })
	readonly limit?: number = 10;
	@ApiProperty({ default: 0, required: false })
	@IsOptional()
	@Min(0, { message: "Offset must bee equal greater than 0" })
	@IsInt({ message: "The offset must be an integer" })
	readonly offset?: number = 0;
}
