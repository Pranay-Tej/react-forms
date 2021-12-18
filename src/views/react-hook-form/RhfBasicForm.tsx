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
  officeLocation: string;
}

const RhfBasicForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      name: "Test",
      age: 20,
      email: "test@test.co",
      joiningdate: "2020-01-01",
      officeLocation: "Bangalore",
    },
  });

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
        id="name"
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
        id="age"
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
        id="email"
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
        id="joiningdate"
        type="date"
        {...register("joiningdate", {
          required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          valueAsDate: true,
        })}
      />
      {errors?.joiningdate && <span>{errors.joiningdate?.message}</span>}

      <select
        {...register("officeLocation", {
          required: { value: true, message: REQUIRED_FIELD_MESSAGE },
        })}
      >
        <option value="">Select Office</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Delhi">Delhi</option>
      </select>
      {errors?.officeLocation && <span>{errors.officeLocation?.message}</span>}

      <button type="button" onClick={() => reset()}>
        Reset
      </button>
      <input type="submit" />
    </form>
  );
};

export default RhfBasicForm;
