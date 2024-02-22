import "./App.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import { MAX_STUDENTS_LENGTH } from "./constants/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StudentsSchema from "./schemas/StudentSchema";

function App() {
  const form = useForm<z.infer<typeof StudentsSchema>>({
    resolver: zodResolver(StudentsSchema),
    defaultValues: {
      students: [
        {
          name: "",
          email: "",
        },  
      ],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "students",
  });

  function onSubmit(values: z.infer<typeof StudentsSchema>) {
    console.log(values);
  }

  return (
    <form
      className="space-y-6 m-auto max-w-[500px] p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ul className="space-y-6">
        {fields.map((item, index) => (
          <li className="space-y-6" key={item.id}>
            <h4 className="flex font-medium mb-4">{`Student #${index + 1}`}</h4>
            <hr></hr>
            <div className="block">
              <Label className="flex mb-2" value="Student Email" />
              <Controller
                render={({ field }) => (
                  <TextInput
                    placeholder="name@flowbite.com"
                    required
                    {...field}
                  />
                )}
                name={`students.${index}.email`}
                control={control}
              />
              <p className="text-red-500 font-medium flex text-sm mt-2">
                {errors.students
                  ? errors.students[index]?.email?.message
                  : null}
              </p>
            </div>
            <div className="mb-2 block">
              <Label className="flex mb-2" value="Student Name" />
              <Controller
                render={({ field }) => (
                  <TextInput type="text" required {...field} />
                )}
                name={`students.${index}.name`}
                control={control}
              />
              <p className="text-red-500 font-medium flex text-sm mt-2">
                {errors.students ? errors.students[index]?.name?.message : null}
              </p>
            </div>

            <Button color="failure" type="button" onClick={() => remove(index)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Button
        disabled={fields.length >= MAX_STUDENTS_LENGTH}
        type="button"
        onClick={() => append({ email: "", name: "" })}
      >
        Append
      </Button>

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default App;
