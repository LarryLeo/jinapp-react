import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default class Home extends Component {
  componentDidMount() {
    console.log('触发')
  }
  render() {
    return (
      <div>
        <p>首页</p>
        <Link to={{
          pathname: '/notice',
          state: {
            title: '政策宣传',
          }
        }}>
        <p>跳转至政策宣传</p>
        </Link>
      </div>
    );
  }
}
