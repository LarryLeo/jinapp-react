import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { GlobalStyle } from "./style";
import './App.css'

import Home from './pages/home/index'
import Service from './pages/serviceNav/index'
import My from './pages/my'
import Login from './pages/login/index'
import Register from './pages/register/index'
import NotFound from './pages/NoFound/index'

import BottomTabNavigator from './components/BottomTabNavigator/index'

export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <GlobalStyle />
          <BottomTabNavigator />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/service' component={Service} />
            <Route exact path='/my' component={My} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            {/* 没找到 */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
