import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const RHFHome = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <ul>
        <li>
          <Link to={`${path}/basic-form`}>Basic Form</Link>
        </li>
        <li>
          <Link to={`${path}/custom-validation`}>Custom Validation</Link>
        </li>
      </ul>
    </div>
  );
};

export default RHFHome;
