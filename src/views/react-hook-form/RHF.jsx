import React from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import RHFBasicForm from "./RHFBasicForm";
import RHFHome from "./RHFHome";

const RHF = () => {
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
          <RHFHome />
        </Route>
        <Route path={`${path}/basic-form`}>
          <RHFBasicForm />
        </Route>
      </Switch>
    </>
  );
};

export default RHF;
