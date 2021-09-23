import { useMemo } from "react";
import { Button, Title } from "../../atoms";
import { DatePickerLabel, HourPickerLabel } from "../../molecules";
import TextInputLabel from "../../molecules/TextInputLabel/TextInputLabel";
import { Wrapper } from "./AddNewEventForm.style";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function AddNewEventForm({
	onSubmit,
	status: { isLoading, error, isSuccess },
}) {
	const { formInputs, validationSchema, initialValues } = useMemo(
		() => ({
			formInputs: [
				{
					name: "firstname",
					placeholder: "Type firstname",
					label: "Firstname",
					required: true,
				},
				{
					name: "lastname",
					placeholder: "Type lastname",
					label: "Lastname",
					required: true,
				},
				{
					name: "email",
					placeholder: "Type email",
					label: "Email",
					required: true,
				},
			],
			initialValues: {
				firstname: "",
				lastname: "",
				email: "",
				date: new Date(),
				time: "12:30",
			},
			validationSchema: Yup.object().shape({
				firstname: Yup.string()
					.min(2, "Too short")
					.max(200, "Too long")
					.required("Required"),
				lastname: Yup.string()
					.min(2, "Too short")
					.max(200, "Too long")
					.required("Required"),
				email: Yup.string()
					.email("Invalid email")
					.min(4, "Too short")
					.max(200, "Too long")
					.required("Required"),
				date: Yup.date().required("Required"),
				time: Yup.string().required("Required"),
			}),
		}),
		[],
	);
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values, actions) => onSubmit(values, actions),
	});

	return (
		<Wrapper onSubmit={formik.handleSubmit}>
			<Title
				txt={
					isLoading
						? "Creating "
						: isSuccess
						? "Created "
						: error
						? error.data?.message?.join(", ") || "Something went wrong"
						: "Create new event"
				}
			/>
			{formInputs.map((item) => (
				<TextInputLabel
					{...item}
					key={item.name}
					{...formik.getFieldProps(item.name)}
					errorMsg={formik.touched[item.name] && formik.errors[item.name]}
				/>
			))}
			<DatePickerLabel
				label="Date"
				name="date"
				{...formik.getFieldProps("date")}
			/>
			<HourPickerLabel name="time" {...formik.getFieldProps("time")} />
			<Button
				text="Create"
				type="submit"
				additionalStyles={{ marginTop: "25px" }}
				disabled={formik.isSubmitting}
			/>
		</Wrapper>
	);
}
