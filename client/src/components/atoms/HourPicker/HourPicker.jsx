import { useState } from "react";
import { Wrapper } from "./HourPicker.styles";

export default function HourSelect({ name, value, onChange }) {
	const [time, setTime] = useState(value.split(":"));
	const handleChange = (e) => {
		const t = time;
		time[e.target.name === "hour" ? 0 : 1] = e.target.value;
		setTime(t);
		onChange({ target: { value: time.join(":"), name } });
	};
	return (
		<Wrapper name={name}>
			<select name="hour" value={time[0]} onChange={handleChange}>
				{[...Array(24).keys()].map((item) => (
					<option
						key={`hour${item}`}
						value={item < 10 ? `0${item}` : `${item}`}
					>
						{item < 10 ? `0${item}` : `${item}`}
					</option>
				))}{" "}
			</select>
			:
			<select name="minute" value={time[1]} onChange={handleChange}>
				{[...Array(60).keys()].map((item) => (
					<option
						key={`minute${item}`}
						value={item < 10 ? `0${item}` : `${item}`}
					>
						{item < 10 ? `0${item}` : `${item}`}
					</option>
				))}
			</select>
		</Wrapper>
	);
}
