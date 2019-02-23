import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Flex } from "antd-mobile";
import { HomePageWrapper } from "./style";

export default class Home extends Component {
  componentDidMount() {
    console.log("首页挂载");
  }
  render() {
    return (
      <HomePageWrapper>
        <Link
          to={{
            pathname: "/notice",
            state: {
              title: "政策宣传"
            }
          }}
        >
          <p>跳转至政策宣传</p>
        </Link>
      </HomePageWrapper>
    );
  }
}
