import { API_URL } from "@/constants/app.constants";
import { REQUIRED_FIELD_MESSAGE } from "@/constants/validations.constants";
import useApiCallStatus from "@/hooks/useApiCallStatus";
import useAxiosGet from "@/hooks/useAxiosGet";
import { BrandResponse } from "@/models/ItRequest/BrandResponse";
import { LaptopModelResponse } from "@/models/ItRequest/LaptopModelResponse";
import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

interface LaptopForm {
  brand: string;
  model: string;
}

const RhfAsyncFieldPopulate = () => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LaptopForm>();

  // fetch brandList
  const {
    data: brandList,
    isLoading: isBrandListLoading,
    errorMessage: brandListErrorMessage,
    getData: fetchBrandList,
  } = useAxiosGet<BrandResponse[]>(`${API_URL}/laptop-brands`);

  // fetch laptopModelList
  const {
    data: laptopModelList,
    isLoading: isLaptopModelListLoading,
    errorMessage: laptopModelListErrorMessage,
    getData: fetchLaptopModelList,
  } = useAxiosGet<LaptopModelResponse[]>();

  useEffect(() => {
    fetchBrandList();
  }, []);

  const selectedBrand = useWatch({
    control: control,
    name: "brand",
  });

  useEffect(() => {
    console.log("brand selected");

    fetchLaptopModelList(`${API_URL}/laptops?brand=${selectedBrand}`);
  }, [selectedBrand]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          (data) => console.log(data),
          (e) => console.log(e)
        )}
      >
        <select
          {...register("brand", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
          disabled={isBrandListLoading}
        >
          <option value="">Select Brand</option>
          {brandList &&
            brandList.map(({ id, brand }) => (
              <option key={id} value={brand}>
                {brand}
              </option>
            ))}
        </select>
        <br />
        {errors?.brand && <span>{errors.brand?.message}</span>}
        <br />

        <select
          {...register("model", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
          disabled={!selectedBrand || isLaptopModelListLoading}
        >
          <option value="">Select Model</option>
          {laptopModelList &&
            laptopModelList.map(({ id, model }) => (
              <option key={id} value={model}>
                {model}
              </option>
            ))}
        </select>
        <br />
        {errors?.model && <span>{errors.model?.message}</span>}
        <br />

        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <input type="submit" />
      </form>
    </div>
  );
};

export default RhfAsyncFieldPopulate;
