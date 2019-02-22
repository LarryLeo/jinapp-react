import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router'
import { BottomTabGroup } from "./style";
import { Icon } from "antd";

class BottomTabNavigator extends Component {
  handelPageLevel = () => {
    const { location } = this.props;
    if(location.state) return location.state
    switch (location.pathname) {
      case '/my':
        return {
          title: '我的',
          level: 1
        }
      case '/service':
        return {
          title: '江津政务',
          level: 1
        }
      case '/':
        return {
          title: '警企e通',
          level: 1
        }
      default:
        return {
          title: '默认',
          level: 0
        }
    }
  }
  render() {
    return (
      <BottomTabGroup isLevelOne={this.handelPageLevel().level}>
        <div className="tabWrapper">
          <NavLink activeClassName='activeTab' exact to={{
            pathname: '/',
            state: {
              title: '警企e通',
              level: 1
            }
          }}>
            <div className="iconWrapper">
              <Icon style={{fontSize: 20}} type="home" theme="filled" />
              <span className='tabName'>首页</span>
            </div>
          </NavLink>
          <NavLink activeClassName='activeTab' exact to={{
            pathname: '/service',
            state: {
              title: '江津政务',
              level: 1
            }
          }}>
            <div className="iconWrapper">
              {" "}
              <Icon style={{fontSize: 20}} type="printer" theme="filled" />
              <span className='tabName'>江津政务</span>
            </div>
          </NavLink>
          <NavLink activeClassName='activeTab' exact to={{
            pathname: '/my',
            state: {
              title: '我的',
              level: 1
            }
          }}>
            <div className="iconWrapper">
              {" "}
              <Icon style={{fontSize: 20}} type="smile" theme="filled" />
              <span className='tabName'>我的</span>
            </div>
          </NavLink>
        </div>
      </BottomTabGroup>
    );
  }
}

export default withRouter(BottomTabNavigator)
