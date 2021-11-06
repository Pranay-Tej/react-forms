import {
  MIN_LENGTH_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/constants/validations.constants";
import useToggle from "@/hooks/useToggle";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

interface PasswordMatch {
  password: string;
  password_repeat: string;
}

export const RhfCrossFieldValidation = () => {
  const { value: isPasswordVisible, toggleValue: toggleVisibility } =
    useToggle(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<PasswordMatch>();

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form
      onSubmit={handleSubmit(
        (data) => console.log(data),
        (e) => console.log(e)
      )}
    >
      <label>Password</label>
      <input
        type={isPasswordVisible ? "text" : "password"}
        {...register("password", {
          required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          minLength: {
            value: 5,
            message: MIN_LENGTH_MESSAGE(5),
          },
        })}
      />
      {errors?.password && <p>{errors.password?.message}</p>}

      <label>Repeat password</label>
      <input
        type={isPasswordVisible ? "text" : "password"}
        {...register("password_repeat", {
          validate: {
            noMatch: (value) =>
              value === password.current || "The passwords do not match",
          },
        })}
      />
      {errors?.password_repeat && <p>{errors?.password_repeat?.message}</p>}
      <button type="button" onClick={toggleVisibility}>
        {" "}
        {isPasswordVisible ? "😑" : "😐"}
      </button>
      <input type="submit" />
    </form>
  );
};
