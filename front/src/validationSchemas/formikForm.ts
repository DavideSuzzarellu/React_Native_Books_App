import * as yup from "yup"

export const formikFormSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required"),
    author: yup
        .string()
        .required("Title is required"),
    year: yup
        .string()
        .required("Title is required"),
    type: yup
        .string()
        .required("Title is required"),
    description: yup
        .string()
        .required("Title is required"),
    img: yup
        .string()
        .required("Title is required")
})