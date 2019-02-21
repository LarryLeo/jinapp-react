import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router'
import { BottomTabGroup } from "./style";
import { Icon } from "antd";

class BottomTabNavigator extends Component {
  handelActive = (match, location) => {
    console.log(!!match)
  }
  render() {
    return (
      <BottomTabGroup isLevelOne={this.props.location.state.level}>
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
