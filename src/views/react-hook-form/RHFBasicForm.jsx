import React from "react";
import { useForm } from "react-hook-form";

const RHFBasicForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
        name="name"
        {...register("name", {
          required: true,
          minLength: 3,
          // custom message
          maxLength: { value: 6, message: `Maximum 6 characters allowed` },
        })}
      />
      {errors?.name?.type === "required" && <span>This field is required</span>}
      {errors?.name?.type === "minLength" && (
        <span>Enter at least 3 characters</span>
      )}
      {errors?.name?.type === "maxLength" && <span>{errors.name.message}</span>}
      <br />

      <label htmlFor="age">age</label>
      <input
        type="number"
        name="age"
        {...register("age", {
          min: { value: 10, message: "You should be at least 10 years old" },
          max: { value: 200, message: "🤨" },
          // number instead of text value
          valueAsNumber: true,
        })}
      />
      {errors?.age?.type === "min" && <span>{errors.age.message}</span>}
      {errors?.age?.type === "max" && <span>{errors.age.message}</span>}
      <br />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        {...register("email", {
          pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/,
          required: true,
        })}
      />
      {errors?.email?.type === "required" && (
        <span>This field is required</span>
      )}
      {errors?.email?.type === "pattern" && <span>Enter a valid email</span>}
      <br />

      <label htmlFor="joiningdate">Joining Date</label>
      <input
        type="date"
        name="joiningdate"
        {...register("joiningdate", {
          required: true,
          valueAsDate: true,
        })}
      />
      {errors?.joiningdate?.type === "required" && (
        <span>This field is required</span>
      )}

      <input type="submit" />
    </form>
  );
};

export default RHFBasicForm;
