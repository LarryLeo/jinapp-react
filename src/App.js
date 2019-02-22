import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import store from './store/index'
import { Provider } from 'react-redux'
import { GlobalStyle } from "./style";
import './App.css'

import Login from './pages/login/index'
import Register from './pages/register/index'
import NotFound from './pages/NoFound/index'

import Notice from './pages/notice/index'
import NoticeDetail from './pages/noticeDetail/index'

import HeaderTitle from './components/HeaderTitle/index'
import BottomTabNavigator from './components/BottomTabNavigator/index'

export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <GlobalStyle />
            <HeaderTitle />
            {/* 一级页面之间Tab导航 , Switch在初次匹配上路由的时候，即停止向后检索*/}
            <Switch>
              <Route exact path='/' component={BottomTabNavigator} />
              {/* <Route exact path='/service' component={Service} />
              <Route exact path='/my' component={My} /> */}
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              {/* 一级页面向二级三级页面导航 */}
              <Route exact path='/notice' component={Notice} />
              <Route exact path='/notice/detail' component={NoticeDetail} />
              {/* 没找到404, 始终写在最后一个路由后面，保证检索完整个路由 */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
