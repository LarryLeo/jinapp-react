import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { ServiceList } from "./style";

class Service extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <ServiceList>
        <ul className="serviceList">
          <li className="listItem">
            <p className="title">江津交巡警事故快处</p>
            <IoIosArrowForward size={20} color="#888" />
          </li>
          <li className="listItem">
            <p className="title">江津车管所排队系统</p>
            <IoIosArrowForward size={20} color="#888" />
          </li>
          <li className="listItem">
            <p className="title">重庆公安出入境服务</p>
            <IoIosArrowForward size={20} color="#888" />
          </li>
          <li className="listItem">
            <p className="title">户口居住证办理</p>
            <IoIosArrowForward size={20} color="#888" />
          </li>
          <li className="listItem" onClick={() => this.props.history.push({
            pathname: '/navigation',
            state: {
              title: '大厅导航'
            }
          })}>
            <p className="title">大厅导航</p>
            <IoIosArrowForward size={20} color="#888" />
          </li>
          <li className="listItem" onClick={() => this.props.history.push({
            pathname: '/contacts',
            state: {
              title: '警企备忘录'
            }
          })}>
            <p className="title">警企备忘录</p>
            <IoIosArrowForward size={20} color="#888" />
          </li>
        </ul>
      </ServiceList>
    );
  }
}

export default withRouter(Service)
