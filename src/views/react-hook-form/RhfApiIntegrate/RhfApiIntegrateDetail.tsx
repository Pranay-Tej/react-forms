import { API_URL } from "@/constants/app.constants";
import {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MIN_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/constants/validations.constants";
import useApiCallStatus from "@/hooks/useApiCallStatus";
import useAxiosGet from "@/hooks/useAxiosGet";
import { BrandResponse } from "@/models/ItRequest/BrandResponse";
import { LaptopModelResponse } from "@/models/ItRequest/LaptopModelResponse";
import { OsResponse } from "@/models/ItRequest/OsResponse";
import { ReasonResponse } from "@/models/ItRequest/ReasonResponse";
import { SoftwareResponse } from "@/models/ItRequest/SoftwareResponse";
import { UserResponse } from "@/models/ItRequest/UserResponse";
import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { ItRequestResponse } from "../../../models/ItRequest/ItRequestResponse";

interface ItRequestForm {
  user: string;
  reason: string;
  otherReason?: string;
  brand: string;
  model: string;
  os: string;
  software: string[];
}

const RhfApiIntegrateDetail = () => {
  const { id: itRequestId } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
    getValues,
    control,
  } = useForm<ItRequestForm>({
    defaultValues: {
      user: "",
      reason: "",
      brand: "",
      model: "",
      os: "",
      software: [],
    },
  });

  // fetch itRequest

  const setFormValues = ({
    user,
    reason,
    otherReason,
    brand,
    model,
    os,
    software,
  }: ItRequestResponse) => {
    setValue("user", user);
    setValue("reason", reason);
    if (otherReason) {
      setValue("otherReason", otherReason);
    }
    setValue("brand", brand);
    setValue("model", model);
    setValue("os", os);
    setValue("software", software);
  };

  const {
    data: itRequest,
    setData: setItRequest,
    isLoading: isItRequestLoading,
    setIsLoading: setIsItRequestLoading,
    errorMessage: itRequestErrorMessage,
    setErrorMessage: setItRequestErrorMessage,
  } = useApiCallStatus<ItRequestResponse>();

  const fetchItRequest = async () => {
    try {
      setIsItRequestLoading(true);
      const response: AxiosResponse<ItRequestResponse> = await axios(
        `${API_URL}/it-requests/${itRequestId}`
      );
      setItRequest(response.data);
      setFormValues(response.data);
    } catch (error: any) {
      setItRequestErrorMessage(error.message);
    } finally {
      setIsItRequestLoading(false);
    }
  };

  // fetch user list
  const {
    data: userList,
    isLoading: isUserListLoading,
    errorMessage: userListErrorMessage,
    getData: fetchUserList,
  } = useAxiosGet<UserResponse[]>(`${API_URL}/users`);

  // fetch brand list
  const {
    data: brandList,
    isLoading: isBrandListLoading,
    errorMessage: brandListErrorMessage,
    getData: fetchBrandList,
  } = useAxiosGet<BrandResponse[]>(`${API_URL}/laptop-brands`);

  // fetch reason list
  const {
    data: reasonList,
    isLoading: isReasonListLoading,
    errorMessage: reasonListErrorMessage,
    getData: fetchReasonList,
  } = useAxiosGet<ReasonResponse[]>(`${API_URL}/reasons`);

  // fetch reason list
  const {
    data: osList,
    isLoading: isOsListLoading,
    errorMessage: osListErrorMessage,
    getData: fetchOsList,
  } = useAxiosGet<OsResponse[]>(`${API_URL}/os`);

  // fetch reason list
  const {
    data: softwareList,
    isLoading: isSoftwareListLoading,
    errorMessage: softwareListErrorMessage,
    getData: fetchSoftwareList,
  } = useAxiosGet<SoftwareResponse[]>(`${API_URL}/softwares`);

  // fetch laptopModelList
  const {
    data: laptopModelList,
    isLoading: isLaptopModelListLoading,
    errorMessage: laptopModelListErrorMessage,
    getData: fetchLaptopModelList,
  } = useAxiosGet<LaptopModelResponse[]>();

  useEffect(() => {
    Promise.allSettled([
      fetchUserList(),
      fetchReasonList(),
      fetchBrandList(),
      fetchOsList(),
      fetchSoftwareList(),
    ])
      .then(() => {
        if (itRequestId !== "new") {
          fetchItRequest();
        }
      })
      .catch((error) => {
        setItRequestErrorMessage(error.message);
      });
  }, [itRequestId]);

  const selectedBrand = useWatch({
    control: control,
    name: "brand",
  });

  useEffect(() => {
    if (selectedBrand) {
      fetchLaptopModelList(`${API_URL}/laptops?brand=${selectedBrand}`).then(
        () => {
          // NOTE
          // model value is set in fetchItRequest
          // on page load the form will disconnect when modelList loads
          // so we need to re-connect it by manually setting the value from already fetched itRequest to form
          if (itRequest?.brand === selectedBrand) {
            setValue("model", itRequest?.model);
          }
        }
      );
    }
  }, [selectedBrand]);

  const atLeastOne = () => {
    return getValues("software").length ? true : MIN_MESSAGE(1);
  };

  if (isItRequestLoading) {
    return <div>Loading...</div>;
  }
  if (itRequestErrorMessage) {
    return <div>Error: {itRequestErrorMessage}</div>;
  }

  return (
    <div>
      <Link to="/react-hook-form/api-integrate">Back</Link>
      <br />

      <form
        onSubmit={handleSubmit(
          (data) => console.log(getValues()),
          (e) => console.log(e)
        )}
      >
        <select
          disabled={isUserListLoading}
          {...register("user", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
        >
          <option value="">Select User</option>
          {userList &&
            userList.map(({ id, user }) => (
              <option key={id} value={user}>
                {user}
              </option>
            ))}
        </select>
        <br />
        {errors?.user && <span>{errors.user?.message}</span>}
        <br />

        <select
          disabled={isBrandListLoading}
          {...register("brand", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
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
          disabled={!selectedBrand || isLaptopModelListLoading}
          {...register("model", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
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

        <select
          {...register("reason", {
            required: { value: true, message: REQUIRED_FIELD_MESSAGE },
          })}
          disabled={isReasonListLoading}
        >
          <option value="">Select Reason</option>
          {reasonList &&
            reasonList.map(({ id, reason }) => (
              <option key={id} value={reason}>
                {reason}
              </option>
            ))}
        </select>
        <br />
        {errors?.reason && <span>{errors.reason?.message}</span>}
        <br />

        <label htmlFor="otherReason">Other Reason</label>
        <input
          id="otherReason"
          type="text"
          disabled={watch("reason", "") !== "Other"}
          {...register("otherReason", {
            required: {
              value: watch("reason", "") === "Other",
              message: REQUIRED_FIELD_MESSAGE,
            },
            minLength: { value: 3, message: MIN_LENGTH_MESSAGE(3) },
            maxLength: { value: 20, message: MAX_LENGTH_MESSAGE(20) },
          })}
        />
        {errors?.otherReason && <span>{errors.otherReason?.message}</span>}
        <br />

        {osList &&
          osList.map(({ id, os }) => (
            <div key={id}>
              <input
                type="radio"
                {...register("os", {
                  required: { value: true, message: REQUIRED_FIELD_MESSAGE },
                })}
                value={os}
                id={os}
              />
              <label htmlFor={os}>{os}</label>
            </div>
          ))}
        <br />
        {errors?.os && <span>{errors.os.message}</span>}
        <br />

        {softwareList &&
          softwareList.map(({ id, software }) => (
            <div key={id}>
              <input
                type="checkbox"
                {...register("software", {
                  validate: atLeastOne,
                })}
                value={software}
                id={software}
              />
              <label htmlFor={software}>{software}</label>
            </div>
          ))}
        <br />

        {errors?.software && <span>{(errors.software as any)?.message}</span>}
        <br />

        <input type="submit" />
      </form>
    </div>
  );
};

export default RhfApiIntegrateDetail;
