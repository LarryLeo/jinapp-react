import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { BottomTabGroup } from "./style";
import { TabBar } from "antd-mobile";
import { IoMdHome, IoIosBriefcase, IoMdPerson } from "react-icons/io";

import Home from "../../pages/home/index";
import Service from "../../pages/serviceNav/index";
import My from "../../pages/my/index";

class BottomTabNavigator extends Component {
  state = {
    selectedTab: "home"
  };

  switchTab = (tabName) => {
    this.setState({
      selectedTab: tabName
    })
  }

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
  render() {
    return (
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <TabBar tabBarPosition="bottom" prerenderingSiblingsNumber={0}>
          <TabBar.Item
            title="首页"
            icon={<IoMdHome fontSize={26} />}
            selectedIcon={<IoMdHome fontSize={26} />}
            selected={this.state.selectedTab === "home"}
            onPress={() => this.switchTab('home')}
          >
            <Home />
          </TabBar.Item>
          <TabBar.Item
            title="江津政务"
            icon={<IoIosBriefcase fontSize={26} />}
            selected={this.state.selectedTab === "service"}
            selectedIcon={<IoIosBriefcase fontSize={26} />}
            onPress={() => this.switchTab('service')}
          >
            <Service />
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            icon={<IoMdPerson fontSize={26} />}
            selected={this.state.selectedTab === "my"}
            selectedIcon={<IoMdPerson fontSize={26} />}
            onPress={() => this.switchTab('my')}
          >
            <My />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(BottomTabNavigator);
