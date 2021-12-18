import { MIN_MESSAGE } from "@/constants/validations.constants";
import React from "react";
import { useForm } from "react-hook-form";

interface SoftwareList {
  softwareList: string[];
}

const RhfCheckboxGroup = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SoftwareList>();

  const atLeastOne = () => {
    return getValues("softwareList").length ? true : MIN_MESSAGE(1);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          (data) => console.log(data),
          (e) => console.log(e)
        )}
      >
        <input
          type="checkbox"
          {...register("softwareList", {
            validate: atLeastOne,
          })}
          value="nodejs"
          id="nodejs"
        />
        <label htmlFor="nodejs">Node JS</label>
        <br />

        <input
          type="checkbox"
          {...register("softwareList", {
            validate: atLeastOne,
          })}
          value="vscode"
          id="vscode"
        />
        <label htmlFor="vscode">VS Code</label>
        <br />

        <input
          type="checkbox"
          {...register("softwareList", {
            validate: atLeastOne,
          })}
          value="postman"
          id="postman"
        />
        <label htmlFor="postman">Postman</label>
        <br />

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

export default RhfCheckboxGroup;
