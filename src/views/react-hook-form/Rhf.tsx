import React from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import RhfApiIntegrate from "./RhfApiIntegrate/RhfApiIntegrate";
import RhfAsyncFieldPopulate from "./RhfAsyncFieldPopulate";
import RhfAsyncFieldValidation from "./RhfAsyncFieldValidation";
import RhfBasicForm from "./RhfBasicForm";
import RhfCheckboxGroup from "./RhfCheckboxGroup";
import { RhfCrossFieldValidation } from "./RhfCrossFieldValidation";
import RhfCustomValidation from "./RhfCustomValidation";
import { RhfDynamicValidation } from "./RhfDynamicValidation";
import RhfHome from "./RhfHome";
import RhfMui from "./RhfMui";
import RhfMultiSelect from "./RhfMultiSelect";
import RhfRadioGroup from "./RhfRadioGroup";

const Rhf = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <h2>ReactHookForm</h2>
      <nav>
        <Link to={path}>RHF Home</Link>
      </nav>

      <hr />

      <Switch>
        <Route exact path={path}>
          <RhfHome />
        </Route>
        <Route path={`${path}/basic-form`}>
          <RhfBasicForm />
        </Route>
        <Route path={`${path}/multi-select`}>
          <RhfMultiSelect />
        </Route>
        <Route path={`${path}/radio-group`}>
          <RhfRadioGroup />
        </Route>
        <Route path={`${path}/checkbox-group`}>
          <RhfCheckboxGroup />
        </Route>
        <Route path={`${path}/custom-validation`}>
          <RhfCustomValidation />
        </Route>
        <Route path={`${path}/cross-field-validation`}>
          <RhfCrossFieldValidation />
        </Route>
        <Route path={`${path}/dynamic-validation`}>
          <RhfDynamicValidation />
        </Route>
        <Route path={`${path}/async-field-validation`}>
          <RhfAsyncFieldValidation />
        </Route>
        <Route path={`${path}/async-field-populate`}>
          <RhfAsyncFieldPopulate />
        </Route>
        <Route path={`${path}/api-integrate`}>
          <RhfApiIntegrate />
        </Route>
        <Route path={`${path}/mui`}>
          <RhfMui />
        </Route>
      </Switch>
    </>
  );
};

export default Rhf;
