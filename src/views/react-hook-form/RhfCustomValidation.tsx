import { REQUIRED_FIELD_MESSAGE } from "@/constants/validations.constants";
import React from "react";
import { useForm } from "react-hook-form";

interface Email {
  email: string;
}

const RhfCustomValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Email>();

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
        {...register("email", {
          required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          validate: {
            reactDomain: (val) =>
              RegExp(/^[^@ \t\r\n]+@react.com$/).test(val) ||
              "Should end with @react.com",
          },
        })}
      />
      {errors?.email && <span>{errors.email?.message}</span>}

      <input type="submit" />
    </form>
  );
};

export default RhfCustomValidation;
