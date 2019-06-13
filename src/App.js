/**
 * @Author: harsha
 * @Date:   2019-05-13T22:46:53+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-13T19:33:08+05:30
 */

import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import MainViewComponent from "./components/MainViewComponent/MainViewComponent";
import DetailViewComponent from "./components/DetailViewComponent/DetailViewComponent";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="Detail-header">
        <Container>
          <h1 className="Detail-title">Shipment Manager</h1>
        </Container>
      </header>
      <Switch>
        <Route exact path="/" component={MainViewComponent} />
        <Route path="/detail/:id" component={DetailViewComponent} />
      </Switch>
    </div>
  );
}

export default App;
