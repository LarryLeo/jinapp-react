import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { GlobalStyle } from "./style";

import Home from './pages/home/index'
import Service from './pages/serviceNav/index'
import My from './pages/my'
import Login from './pages/login/index'
import Register from './pages/register/index'
import NotFound from './pages/NoFound/index'

export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <BrowserRouter>
        <div>
          <GlobalStyle />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/service' component={Service} />
            <Route exact path='/my' component={My} />
            {/* 没找到 */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
