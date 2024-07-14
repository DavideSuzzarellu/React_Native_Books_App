import * as yup from "yup"

export const formikFormSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required"),
    author: yup
        .string()
        .required("Author is required"),
    year: yup
        .string()
        .required("Year is required"),
    type: yup
        .string()
        .required("Type is required"),
    description: yup
        .string()
        .required("Description is required"),
    img: yup
        .string()
})