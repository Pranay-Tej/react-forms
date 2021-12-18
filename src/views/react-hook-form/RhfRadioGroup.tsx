import { REQUIRED_FIELD_MESSAGE } from "@/constants/validations.constants";
import React from "react";
import { useForm } from "react-hook-form";

interface OperatingSystem {
  os: string;
}

const RhfRadioGroup = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<OperatingSystem>();
  return (
    <div>
      <form
        onSubmit={handleSubmit(
          (data) => console.log(data),
          (e) => console.log(e)
        )}
      >
        <input
          type="radio"
          {...register("os", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
          value="linux"
          id="linux"
        />
        <label htmlFor="linux">Linux</label>
        <br />

        <input
          type="radio"
          {...register("os", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
          value="windows"
          id="windows"
        />
        <label htmlFor="windows">Windows</label>
        <br />

        <input
          type="radio"
          {...register("os", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
          value="mac"
          id="mac"
        />
        <label htmlFor="mac">Mac</label>
        <br />

        {errors?.os && <span>{errors.os.message}</span>}

        <input type="submit" />
      </form>

      <p>Value: {getValues("os")}</p>
    </div>
  );
};

export default RhfRadioGroup;
