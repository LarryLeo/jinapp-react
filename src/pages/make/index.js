import React, { Component } from "react";
import { MakeWrapper } from "./style";
import { Flex, Picker, Button } from "antd-mobile";
import { Link } from "react-router-dom";

const mockData = [
  {
    label: "AA",
    value: "aa"
  },
  {
    label: "公安",
    value: "14"
  },
  {
    label: "AA",
    value: "aa"
  },
  {
    label: "AA",
    value: "aa"
  }
];
const PickerChildren = props => (
  <div onClick={props.onClick} className="pickerChildren">
    <div className="inlineWrapper">
      <div className="pickerKey">{props.children}</div>
      <div className="pickerVal">{props.extra}</div>
    </div>
  </div>
);
export default class Make extends Component {
  state = {
    currentPage: ""
  };
  renderHistoryJump = () => {
    switch (this.state.currentPage) {
      case "suggestion":
        return (
          <Link
            to={{
              pathname: "/my/history/suggestions",
              state: {
                title: "我的历史"
              }
            }}
          >
            <span>意见历史</span>
          </Link>
        );
      case "consultation":
        return (
          <Link
            to={{
              pathname: "/my/history/consultations",
              state: {
                title: "我的历史"
              }
            }}
          >
            <span>咨询历史</span>
          </Link>
        );
      default:
        return (
          <Link
            to={{
              pathname: "/my/history/suggestions",
              state: {
                title: "我的历史"
              }
            }}
          >
            <span>意见历史</span>
          </Link>
        );
    }
  };
  componentDidMount() {
    const {
      params: { type }
    } = this.props.match;
    this.setState({
      currentPage: type
    });
  }
  render() {
    return (
      <MakeWrapper currentPage={this.state.currentPage}>
        <Flex justify="end" className="historyJump">
          {this.renderHistoryJump()}
        </Flex>
        <div className="picker">
          <Picker
            data={mockData}
            value={["14"]}
            cols={1}
            extra="请选择意见对象"
          >
            <PickerChildren>
              {this.state.currentPage === "suggestion" ? "意见建议" : "咨询"}
              对象
            </PickerChildren>
          </Picker>
        </div>
        <div className="picker consultItemPicker">
          <Picker
            data={mockData}
            value={["14"]}
            cols={1}
            extra="请选择意见对象"
          >
            <PickerChildren>咨询事项</PickerChildren>
          </Picker>
        </div>
        <Flex className="subject">
          <span className="key">
            {this.state.currentPage === "suggestion" ? "建议" : "咨询"}主题
          </span>
          <input
            maxLength="20"
            className="value"
            type="text"
            placeholder="请输入主题"
          />
        </Flex>
        <textarea
          placeholder="请输入内容"
          className="textArea"
          name=""
          id=""
          rows="10"
        />
        <div style={{ marginTop: 20, padding: "0 15px" }}>
          <Button type="primary">提交</Button>
        </div>
      </MakeWrapper>
    );
  }
}
