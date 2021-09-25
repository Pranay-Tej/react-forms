import React from "react";
import { useForm } from "react-hook-form";

const RHFCustomValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(
        (data) => console.log(data),
        (e) => console.log(e)
      )}
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        {...register("email", {
          required: true,
          validate: {
            reactDomain: (val) => RegExp(/^[^@ \t\r\n]+@react.com$/).test(val),
          },
        })}
      />
      {errors?.email?.type === "required" && (
        <span>This field is required</span>
      )}
      {errors?.email?.type === "reactDomain" && (
        <span>Enter a valid email ending with @react.com</span>
      )}

      <input type="submit" />
    </form>
  );
};

export default RHFCustomValidation;
