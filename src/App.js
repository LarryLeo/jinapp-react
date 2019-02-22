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

import Contacts from './pages/serviceNav/contacts/index'

import HeaderTitle from './components/HeaderTitle/index'
import BottomTabNavigator from './components/BottomTabNavigator/index'

export default class App extends Component {
  render() {
    const routes = [{
      path: '/',
      component: BottomTabNavigator
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/register',
      component: Register
    }, {
      path: '/notice',
      component: Notice
    }, {
      path: '/notice/detail',
      component: NoticeDetail
    }, {
      path: '/contacts',
      component: Contacts
    }]
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <GlobalStyle />
            <HeaderTitle />
            {/* 一级页面之间Tab导航 , Switch在初次匹配上路由的时候，即停止向后检索*/}
            <Switch>
              {routes.map((route, index) => <Route exact path={route.path} component={route.component} key={index} />)}
              {/* 没找到404, 始终写在最后一个路由后面，保证检索完整个路由 */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
