import {
  MIN_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/constants/validations.constants";
import React from "react";
import { useForm } from "react-hook-form";

interface SoftwareList {
  softwareList: string[];
}

const RhfMultiSelect = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SoftwareList>();

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          (data) => console.log(data),
          (e) => console.log(e)
        )}
      >
        <select
          multiple={true}
          {...register("softwareList", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
        >
          <option value="linux">Linux</option>
          <option value="windows">Windows</option>
          <option value="mac">Mac</option>
        </select>
        {errors?.softwareList && (
          <span>{(errors.softwareList as any)?.message}</span>
        )}
        <input type="submit" />
      </form>

      <p>
        Values: [
        {getValues("softwareList") &&
          getValues("softwareList").map((addon, index) => (
            <span key={addon}>
              {addon}
              {index < getValues("softwareList").length - 1 ? ", " : ""}
            </span>
          ))}
        ]
      </p>
    </div>
  );
};

export default RhfMultiSelect;
