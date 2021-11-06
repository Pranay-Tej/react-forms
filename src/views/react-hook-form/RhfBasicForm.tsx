import React from "react";
import { useForm } from "react-hook-form";
import {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/constants/validations.constants";

interface User {
  name: string;
  age: number;
  email: string;
  joiningdate: string;
}

const RhfBasicForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  // watch input value by passing the name of it
  // console.log(watch("name"));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(
        (data) => console.log(data),
        (e) => console.log(e)
      )}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="name">Name</label>
      <input
        type="text"
        {...register("name", {
          required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          minLength: { value: 3, message: MIN_LENGTH_MESSAGE(3) },
          // custom message
          maxLength: { value: 6, message: MAX_LENGTH_MESSAGE(6) },
        })}
      />
      {errors?.name && <span>{errors.name?.message}</span>}
      <br />

      <label htmlFor="age">age</label>
      <input
        type="number"
        {...register("age", {
          min: { value: 10, message: "You should be at least 10 years old" },
          max: { value: 200, message: "🤨" },
          // number instead of text value
          valueAsNumber: true,
        })}
      />
      {errors?.age && <span>{errors.age?.message}</span>}
      <br />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        {...register("email", {
          pattern: {
            value: /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/,
            message: "Invalid email",
          },
          required: { value: true, message: REQUIRED_FIELD_MESSAGE },
        })}
      />
      {errors?.email && <span>{errors.email?.message}</span>}
      <br />

      <label htmlFor="joiningdate">Joining Date</label>
      <input
        type="date"
        {...register("joiningdate", {
          required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          valueAsDate: true,
        })}
      />
      {errors?.joiningdate && <span>{errors.joiningdate?.message}</span>}

      <input type="submit" />
    </form>
  );
};

export default RhfBasicForm;
