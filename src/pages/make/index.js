import React, { Component } from "react";
import { MakeWrapper } from "./style";
import { Flex, Picker, Button } from "antd-mobile";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchUnitList, fetchConsultSubject } from '../../actions/index'

const PickerChildren = props => (
  <div onClick={props.onClick} className="pickerChildren">
    <div className="inlineWrapper">
      <div className="pickerKey">{props.children}</div>
      <div className="pickerVal">{props.extra}</div>
    </div>
  </div>
);
class Make extends Component {
  state = {
    currentPage: "",
    unitPickerData: [],
    selectedUnit: '',
    consultSubjectPickerData: [],
    selectedConsultSubject: ''
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
    // redux中未缓存单位列表即请求数据
    !this.props.unitList.length && this.props.fetchUnitList()
    const {
      params: { type }
    } = this.props.match;
    this.setState({
      currentPage: type,
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      // 将数据转换为Picker支持的label + Value类型
      let unitPickerData = nextProps.unitList.map(item => ({
        label: item.unit_name,
        value: item.id
      }))
      this.setState({
        unitPickerData
      })
    }
  }
  render() {
    return (
      <MakeWrapper currentPage={this.state.currentPage}>
        <Flex justify="end" className="historyJump">
          {this.renderHistoryJump()}
        </Flex>
        <div className="picker">
          <Picker
            data={this.state.unitPickerData}
            value={this.state.selectedUnit}
            cols={1}
            onChange={(val) => this.setState({selectedUnit: val})}
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
            data={this.state.consultSubjectPickerData}
            value={this.state.selectedConsultSubject}
            onChange={val => this.setState({selectedConsultSubject: val})}
            disabled={!this.state.selectedUnit.length || !this.state.consultSubjectPickerData.length}
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

const mapStateToProps = (state) => ({
  unitList: state.getIn(['makeCenter', 'unitList']).toArray(),
  consultSubjectList: state.getIn(['makeCenter', 'consultSubjectList']).toArray()
})

const mapDispatchToProps = {
  fetchUnitList,
  fetchConsultSubject
}

export default connect(mapStateToProps, mapDispatchToProps)(Make)
