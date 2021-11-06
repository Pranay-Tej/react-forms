import {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MIN_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/constants/validations.constants";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

interface DynamicValidation {
  password: string;
  minLength: number;
  maxLength: number;
}

export const RhfDynamicValidation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<DynamicValidation>();

  const maxLength = useRef(10);
  maxLength.current = watch("maxLength", 10);

  return (
    <form
      onSubmit={handleSubmit(
        (data) => console.log(data),
        (e) => console.log(e)
      )}
    >
      <label>MinLength</label>
      <input
        type="number"
        {...register("minLength", {
          required: REQUIRED_FIELD_MESSAGE,
          valueAsNumber: true,
          min: {
            value: 1,
            message: MIN_MESSAGE(1),
          },
        })}
      />
      {errors.minLength && <p>{errors.minLength.message}</p>}

      <label>MaxLength</label>
      <input
        type="number"
        {...register("maxLength", {
          required: REQUIRED_FIELD_MESSAGE,
          valueAsNumber: true,
          min: {
            value: 1,
            message: MIN_MESSAGE(1),
          },
        })}
      />
      {errors?.maxLength && <p>{errors.maxLength?.message}</p>}

      <label>Password</label>
      <input
        type="text"
        {...register("password", {
          required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          minLength: {
            value: watch("minLength", 1),
            message: MIN_LENGTH_MESSAGE(watch("minLength", 1)),
          },
          maxLength: {
            value: maxLength.current,
            message: MAX_LENGTH_MESSAGE(maxLength.current),
          },
        })}
      />
      {errors?.password && <p>{errors.password?.message}</p>}
      <input type="submit" />
    </form>
  );
};
