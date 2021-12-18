import { API_URL } from "@/constants/app.constants";
import useAxiosGet from "@/hooks/useAxiosGet";
import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ItRequestResponse } from "../../../models/ItRequest/ItRequestResponse";

const RhfApiIntegrateList = () => {
  const { url } = useRouteMatch();

  const {
    data,
    isLoading,
    errorMessage,
    getData: fetchItRequestList,
  } = useAxiosGet<ItRequestResponse[]>(`${API_URL}/it-requests`);

  useEffect(() => {
    fetchItRequestList();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <Link to={`${url}/new`}>New</Link>
      {data &&
        data.map(({ id, user }) => (
          <div key={id}>
            {user}
            <Link to={`${url}/${id}`}>Edit</Link>
          </div>
        ))}
    </div>
  );
};

export default RhfApiIntegrateList;
