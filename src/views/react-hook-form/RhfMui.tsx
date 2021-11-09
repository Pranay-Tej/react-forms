import React from "react";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/constants/validations.constants";

interface MuiForm {
  name: string;
}

const RhfMui = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<MuiForm>({
    defaultValues: {
      name: "",
    },
  });
  return (
    <div>
      <form
        onSubmit={handleSubmit(
          (data) => console.log(data),
          (e) => console.log(e)
        )}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              error={errors?.name !== undefined}
              helperText={errors?.name?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: REQUIRED_FIELD_MESSAGE,
            },
            maxLength: { value: 30, message: MAX_LENGTH_MESSAGE(30) },
            minLength: { value: 2, message: MIN_LENGTH_MESSAGE(2) },
          }}
        />

        <Button variant="text" type="button" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
};

export default RhfMui;
