import { EventAttr } from "./../interfaces/models_interfaces/EventAttr.interface";
import {
	Column,
	DataType,
	Length,
	Model,
	Table,
	IsDate,
	IsEmail,
} from "sequelize-typescript";

@Table({ tableName: "events", timestamps: true })
export class Event extends Model<Event, EventAttr> {
	@Column({
		defaultValue: DataType.UUIDV4,
		primaryKey: true,
		type: DataType.UUID,
	})
	id: string;
	@Length({ min: 2, max: 200 })
	@Column({ type: DataType.STRING, allowNull: false })
	firstname: string;

	@Length({ min: 2, max: 200 })
	@Column({ type: DataType.STRING, allowNull: false })
	lastname: string;
	@Length({ min: 5, max: 200 })
	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			isEmail: { msg: "Incorrect email" },
		},
	})
	email: string;
	@Column({
		type: DataType.DATE,
		allowNull: false,
		validate: {
			isDate: { msg: "Incorrect date", args: false },
		},
	})
	date: Date;
}
