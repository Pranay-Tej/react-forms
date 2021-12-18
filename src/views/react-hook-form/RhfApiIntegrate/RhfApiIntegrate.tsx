import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import RhfApiIntegrateDetail from "./RhfApiIntegrateDetail";
import RhfApiIntegrateList from "./RhfApiIntegrateList";

const RhfApiIntegrate = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <RhfApiIntegrateList />
      </Route>
      <Route path={`${path}/:id`}>
        <RhfApiIntegrateDetail />
      </Route>
    </Switch>
  );
};

export default RhfApiIntegrate;
