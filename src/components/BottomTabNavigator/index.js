import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { BottomTabGroup } from "./style";
import { Icon } from "antd";

export default class BottomTabNavigator extends Component {
  handelActive = (match, location) => {
    console.log(!!match)
  }
  render() {
    return (
      <BottomTabGroup>
        <div className="tabWrapper">
          <NavLink activeClassName='activeTab' exact to="/">
            <div className="iconWrapper">
              <Icon style={{fontSize: 20}} type="home" theme="filled" />
              <span className='tabName'>首页</span>
            </div>
          </NavLink>
          <NavLink activeClassName='activeTab' exact to="/service">
            <div className="iconWrapper">
              {" "}
              <Icon style={{fontSize: 20}} type="printer" theme="filled" />
              <span className='tabName'>江津政务</span>
            </div>
          </NavLink>
          <NavLink activeClassName='activeTab' exact to="/my">
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
