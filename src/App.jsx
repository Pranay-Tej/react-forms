import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = lazy(() => import("./views/Home"));
const ReactHookForm = lazy(() => import("./views/react-hook-form/RHF"));

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/react-hook-form">React Hook Form</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/react-hook-form">
              <ReactHookForm />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
