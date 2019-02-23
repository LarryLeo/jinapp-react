import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { BottomTabGroup } from "./style";
import { TabBar } from "antd-mobile";
import { IoMdHome, IoIosBriefcase, IoMdPerson } from "react-icons/io";
import { connect } from "react-redux";
import { switchHomeTabs } from "../../actions/index";

import Home from "../../pages/home/index";
import Service from "../../pages/serviceNav/index";
import My from "../../pages/my/index";

class BottomTabNavigator extends Component {
  state = {
    selectedTab: "home"
  };

  switchTab = tabName => {
    this.setState({
      selectedTab: tabName
    });
  };

  handelPageLevel = () => {
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
    console.log(this.props);
  }
  render() {
    return (
      <div style={{height: 'calc(100vh - 45px)'}}>
        <TabBar prerenderingSiblingsNumber={0}>
          <TabBar.Item
            title="首页"
            icon={<IoMdHome fontSize={26} />}
            selectedIcon={<IoMdHome fontSize={26} />}
            selected={this.props.homeTabs.get('activeTab') === "home"}
            onPress={() => this.props.switchHomeTabs("home")}
          >
            <Home />
          </TabBar.Item>
          <TabBar.Item
            title="江津政务"
            icon={<IoIosBriefcase fontSize={26} />}
            selected={this.props.homeTabs.get('activeTab') === "service"}
            selectedIcon={<IoIosBriefcase fontSize={26} />}
            onPress={() => this.props.switchHomeTabs("service")}
          >
            <Service />
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            icon={<IoMdPerson fontSize={26} />}
            selected={this.props.homeTabs.get('activeTab') === "my"}
            selectedIcon={<IoMdPerson fontSize={26} />}
            onPress={() => this.props.switchHomeTabs("my")}
          >
            <My />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  homeTabs: state.get("homeTabs")
});

const mapDispatchToProps = {
  switchHomeTabs
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BottomTabNavigator)
);
