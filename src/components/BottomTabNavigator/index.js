import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BottomTabGroup } from "./style";
import { Icon } from "antd";

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <BottomTabGroup>
        <div className="tabWrapper">
          <Link to="/">
            <div className="iconWrapper">
              <Icon style={{fontSize: 20, color: '#007aff'}} type="home" theme="filled" />
              <span className='tabName active'>首页</span>
            </div>
          </Link>
          <Link to="/service">
            <div className="iconWrapper">
              {" "}
              <Icon style={{fontSize: 20}} type="printer" theme="filled" />
              <span className='tabName'>江津政务</span>
            </div>
          </Link>
          <Link to="/my">
            <div className="iconWrapper">
              {" "}
              <Icon style={{fontSize: 20}} type="smile" theme="filled" />
              <span className='tabName'>我的</span>
            </div>
          </Link>
        </div>
      </BottomTabGroup>
    );
  }
}
