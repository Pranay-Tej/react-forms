import React from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import RhfBasicForm from "./RhfBasicForm";
import { RhfCrossFieldValidation } from "./RhfCrossFieldValidation";
import RhfCustomValidation from "./RhfCustomValidation";
import { RhfDynamicValidation } from "./RhfDynamicValidation";
import RhfHome from "./RhfHome";
import RhfMui from "./RhfMui";

const Rhf = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <h2>ReactHookForm</h2>
      <nav>
        <Link to={path}>Home</Link>
      </nav>

      <hr />

      <Switch>
        <Route exact path={path}>
          <RhfHome />
        </Route>
        <Route path={`${path}/basic-form`}>
          <RhfBasicForm />
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
        <Route path={`${path}/mui`}>
          <RhfMui />
        </Route>
      </Switch>
    </>
  );
};

export default Rhf;
