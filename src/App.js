import React, { Component } from "react";
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import store from './store/index'
import { Provider } from 'react-redux'
import { GlobalStyle } from "./style";
import './App.css'
import { AnimatedSwitch } from 'react-router-transition'

import Login from './pages/login/index'
import Register from './pages/register/index'
import NotFound from './pages/NoFound/index'

import Notice from './pages/notice/index'
import NoticeDetail from './pages/notice/noticeDetail/index'
import Guide from "./pages/guide";
import GuideDetail from './pages/guide/guideDetail'
import Make from './pages/make'
import History from './pages/history/index'
import HistoryDetail from './pages/history/detail/index'
import CompanyCommunication from './pages/companyCommunication/index'
import CompanyList from './pages/companyCommunication/companies/index'
import PersonList from './pages/companyCommunication/person/index'
import MessageDetail from './pages/companyCommunication/messageDetail/index'
import Navigation from './pages/serviceNav/navigation/index'
import Contacts from './pages/serviceNav/contacts/index'

import HeaderTitle from './components/HeaderTitle/index'
import BottomTabNavigator from './components/BottomTabNavigator/index'


export default class App extends Component {
  isLogin = () => {
    console.log('判断登录')
    return !!JSON.parse(localStorage.getItem('userCredential'))
  }
  mapStyles = (styles) => ({
    opacity: styles.opacity,
    transform: `translateX(${styles.offset}%)`
  })
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
    },{
      path: '/notice',
      component: Notice
    },{
      path: '/notice/detail',
      component: NoticeDetail
    }, {
      path: '/contacts',
      component: Contacts
    }, {
      path: '/guide',
      component: Guide
    }, {
      path: '/guide/detail',
      component: GuideDetail
    },{
      path: '/my/history/:type',
      component: HistoryDetail
    },{
      path: '/communication/companies',
      component: CompanyList
    },{
      path: '/communication/personlist',
      component: PersonList
    },{
      path: '/communication/message',
      component: MessageDetail
    },{
      path: '/navigation',
      component: Navigation
    }]

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <GlobalStyle />
            <HeaderTitle />
            {/* 一级页面之间Tab导航 , Switch在初次匹配上路由的时候，即停止向后检索*/}
            <AnimatedSwitch
              atEnter={{ opacity: 0, offset: 0}}
              atLeave={{ opacity: 0, offset: -100}}
              atActive={{ opacity:1, offset: 0}}
              mapStyles={this.mapStyles}
              className="switch-wrapper"
            >
              {routes.map((route, index) => <Route exact path={route.path} component={route.component} key={index} />)}
              <Route exact path='/make/:type' render={(props) => this.isLogin() ? (<Make {...props} />) : <Redirect to='/login' />} />
              <Route exact path='/my/history' render={(props) => this.isLogin() ? (<History {...props} />) : <Redirect to='/login' />} />
              <Route exact path='/communication' render={(props) => this.isLogin() ? (<CompanyCommunication {...props} />) : <Redirect to='/login' />} />
              {/* 没找到404, 始终写在最后一个路由后面，保证检索完整个路由 */}
              <Route component={NotFound} />
            </AnimatedSwitch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
