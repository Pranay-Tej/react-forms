import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const RhfHome = () => {
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
        <li>
          <Link to={`${path}/cross-field-validation`}>
            Cross-field Validation
          </Link>
        </li>
        <li>
          <Link to={`${path}/dynamic-validation`}>Dynamic Validation</Link>
        </li>
        <li>
          <Link to={`${path}/mui`}>MUI</Link>
        </li>
      </ul>
    </div>
  );
};

export default RhfHome;
