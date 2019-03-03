import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavBar, Icon } from "antd-mobile";
import { connect } from "react-redux";

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
      case "/login":
        return {
          title: '登录'
        };
      case "/":
        switch (this.props.homeTabs.get('activeTab')) {
          case "home":
            return {
              title: "警企e通",
              level: 1
            };
          case "service":
            return {
              title: "江津政务",
              level: 1
            };
          case "my":
            return {
              title: "我的",
              level: 1
            };
          default:
            return {
              title: "警企e通",
              level: 1
            };
        }
      default:
        return {
          title: "默认",
          level: 0
        };
    }
  };
  componentDidMount() {

  }
  render() {
    return (
      <div style={{position:"fixed", top: 0, width: '100%',zIndex: 9}}>
        <NavBar
        mode="dark"
        leftContent={
          this.props.location.pathname === "/" ? (
            <div />
          ) : (
            <Icon onClick={() => this.props.history.goBack()} type="left" />
          )
        }
      >
        {this.renderNavTitle().title}
      </NavBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  homeTabs: state.get("homeTabs")
});

export default withRouter(connect(mapStateToProps)(HeaderTitle));
