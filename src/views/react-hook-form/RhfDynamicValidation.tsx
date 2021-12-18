import {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MIN_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/constants/validations.constants";
import React, { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

interface DynamicValidation {
  password: string;
  minLength: number;
  maxLength: number;
}

export const RhfDynamicValidation = () => {
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    watch,
    trigger,
    control,
    reset,
  } = useForm<DynamicValidation>({ mode: "all" });

  const maxLength = useRef(10);
  maxLength.current = watch("maxLength", 10);

  const lengthChange = useWatch({
    name: ["minLength", "maxLength"],
    control: control,
  });

  useEffect(() => {
    console.log({ lengthChange });
    if (touchedFields?.password) {
      trigger("password");
    }
  }, [lengthChange]);

  return (
    <form
      onSubmit={handleSubmit(
        (data) => console.log(data),
        (e) => console.log(e)
      )}
    >
      <label htmlFor="minLength">MinLength</label>
      <input
        id="minLength"
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
      <br />

      <label htmlFor="maxLength">MaxLength</label>
      <input
        id="maxLength"
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
      <br />

      <label htmlFor="password">Password</label>
      <input
        id="password"
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
      <br />

      <button type="button" onClick={() => reset()}>
        Reset
      </button>
      <input type="submit" />
    </form>
  );
};
