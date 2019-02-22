import React, { Component } from "react";
import { withRouter } from "react-router";
import { HeaderTitleWrapper } from "./style";
import { NavBar, Icon } from "antd-mobile";

class HeaderTitle extends Component {
  static navOptions = {
    title: "警企e通",
    level: 1
  };
  renderNavTitle = () => {
    const { location } = this.props;
    if (location.state) return location.state;
    switch (location.pathname) {
      case "/my":
        return {
          title: "我的",
          level: 1
        };
      case "/service":
        return {
          title: "江津政务",
          level: 1
        };
      case "/":
        return {
          title: "警企e通",
          level: 1
        };
      default:
        return {
          title: "默认",
          level: 0
        };
    }
  };
  componentDidMount() {
    console.log("我只会调用一次, 路由导航不会remount");
  }
  render() {
    return (
        <NavBar
          mode="dark"
          leftContent={this.props.location.pathname === '/' ? <div></div> : <Icon onClick={() => this.props.history.goBack()} type="left" />}
        >
          {this.renderNavTitle().title}
        </NavBar>
    );
  }
}

export default withRouter(HeaderTitle);
