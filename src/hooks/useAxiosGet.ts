import axios from "axios";
import useApiCallStatus from "@/hooks/useApiCallStatus";

export default function useAxiosGet<T>(url?: string) {
  const {
    data,
    setData,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
  } = useApiCallStatus<T>();

  const getData = async (getDataUrl?: string) => {
    try {
      const requestUrl = getDataUrl || (url as string);
      setIsLoading(true);
      const response = await axios(requestUrl);
      setData(response.data);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    errorMessage,
    getData,
  };
}
