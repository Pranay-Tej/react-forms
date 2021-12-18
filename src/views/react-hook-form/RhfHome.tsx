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
          <Link to={`${path}/multi-select`}>Multi Select</Link>
        </li>
        <li>
          <Link to={`${path}/radio-group`}>Radio Group</Link>
        </li>
        <li>
          <Link to={`${path}/checkbox-group`}>Checkbox Group</Link>
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
          <Link to={`${path}/async-field-validation`}>
            Async Field Validation
          </Link>
        </li>
        <li>
          <Link to={`${path}/async-field-populate`}>Async Field Populate</Link>
        </li>
        <li>
          <Link to={`${path}/api-integrate`}>API Integration</Link>
        </li>
        <li>
          <Link to={`${path}/mui`}>MUI</Link>
        </li>
      </ul>
    </div>
  );
};

export default RhfHome;
