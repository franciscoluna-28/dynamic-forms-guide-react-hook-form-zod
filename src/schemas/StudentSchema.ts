  import { z } from "zod";
import { MAX_STUDENTS_LENGTH } from "../constants/form";

  const MAX_STRING_LENGTH = 50;
  const MIN_STUDENTS_LENGTH = 1;

  const EMPTY_FIELD_MESSAGE = "Field cannot be empty";

  const StudentSchema = z.object({
    email: z
      .string()
      .min(1, { message: EMPTY_FIELD_MESSAGE })
      .email({ message: "You must add a valid email" }),
    name: z
      .string()
      .min(1, { message: EMPTY_FIELD_MESSAGE })
      .max(MAX_STRING_LENGTH, {
        message: `You can add at most ${MAX_STRING_LENGTH} characters`,
      })
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
        "Name should contain only alphabets"
      ),
  });

  const StudentsSchema = z.object({
    students: z
      .array(StudentSchema)
      .min(MIN_STUDENTS_LENGTH, {
        message: `You need to add at least ${MIN_STUDENTS_LENGTH} student`,
      })
      .max(MAX_STUDENTS_LENGTH, {
        message: `You can add at most ${MAX_STUDENTS_LENGTH} students`,
      }),
  });

  export default StudentsSchema;
