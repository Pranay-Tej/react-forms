import React from "react";
import { useForm } from "react-hook-form";
import {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/constants/validations.constants";
import { API_URL } from "@/constants/app.constants";
import axios, { AxiosResponse } from "axios";

interface User {
  username: string;
}

interface UserResponse {
  id: number;
  user: string;
}

const RhfAsyncFieldValidation = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<User>();

  const validateUserName = async (value: string) => {
    try {
      const response: AxiosResponse<UserResponse[]> = await axios(
        `${API_URL}/users?user=${value}`
      );

      if (response.data.length > 0) {
        return "This username is already taken";
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return undefined;
  };

  return (
    <div>
      <p>John, Drake, Kate users not available</p>
      <form
        onSubmit={handleSubmit(
          (data) => console.log(data),
          (e) => console.log(e)
        )}
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register("username", {
            validate: validateUserName,
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
            minLength: { value: 3, message: MIN_LENGTH_MESSAGE(3) },
            maxLength: { value: 6, message: MAX_LENGTH_MESSAGE(6) },
          })}
        />

        {errors?.username && <p>{errors.username?.message}</p>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default RhfAsyncFieldValidation;
