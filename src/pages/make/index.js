import React, { Component } from "react";
import { MakeWrapper } from "./style";
import { Flex, Picker, Button, Toast } from "antd-mobile";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUnitList, fetchConsultSubject } from "../../actions/index";
import { requestPost } from '../../utils/utils'

const PickerChildren = props => (
  // 自定义pickerChildren
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
    selectedUnit: "",
    consultSubjectPickerData: [{ label: "默认", value: -1 }],
    selectedConsultSubject: "",
    title: '',
    content: '',

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
  getConsultSubject = val => {
    this.setState({ selectedUnit: val, selectedConsultSubject: "" });
    // 建议页面不用获取咨询项目
    if(this.state.currentPage === 'suggestion') return
    return this.props.fetchConsultSubject(val);
  };
  submit = async() => {
    // 检查信息完整性
    if(!this.state.selectedUnit.length) return Toast.show('请选择单位')
    if(this.state.currentPage === 'consultation' && !this.state.selectedConsultSubject.length) return Toast.show('请选择咨询事项')
    if(!this.state.title.length) return Toast.show('请填写标题')
    if(!this.state.title.length) return Toast.show('请填写内容')

    let userCredential = JSON.parse(localStorage.getItem('userCredential'))
    let apiUrl = this.state.currentPage === 'suggestion' ? '/app/v1/suggestion/addSuggestion' : '/app/v1/consult/addConsult'
    let data = {
      unit_id: this.state.selectedUnit.toString(),
      title: this.state.title,
      content: this.state.content,
      member_id: userCredential.member_id,
      member_token: userCredential.member_token
    }
    let res = await requestPost({
      apiUrl: apiUrl,
      data: this.state.currentPage === 'suggestion' ? data : {...data, consult_subject_id: this.state.selectedConsultSubject.toString()}
    })
    res.success && Toast.success('发送成功')
    !res.success && Toast.fail('发送失败')
    this.setState({
      content: '',
      title: ''
    })
  }

  componentDidMount() {
    // redux中未缓存单位列表即请求数据
    !this.props.unitList.length && this.props.fetchUnitList();
    let unitPickerData = this.props.unitList.map(item => ({
        label: item.unit_name,
        value: item.id
      }));
    let consultSubjectPickerData = this.props.consultSubjectList.map(item => ({
        label: item.subject_name,
        value: item.id
      }));
    const {
      params: { type }
    } = this.props.match;
    this.setState({
      currentPage: type,
      unitPickerData,
      consultSubjectPickerData
    });
  }
  componentWillReceiveProps(nextProps) {
    // 处理unitList更新
    if (this.props.unitList !== nextProps.unitList) {
      // 将数据转换为Picker支持的label + Value类型
      let unitPickerData = nextProps.unitList.map(item => ({
        label: item.unit_name,
        value: item.id
      }));
      this.setState({
        unitPickerData
      });
    }
    // 处理consultSubject更新
    if (this.props.consultSubjectList !== nextProps.consultSubjectList) {
      let consultSubjectPickerData = nextProps.consultSubjectList.map(item => ({
        label: item.subject_name,
        value: item.id
      }));
      this.setState({
        consultSubjectPickerData
      });
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
            onChange={val => this.getConsultSubject(val)}
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
            onChange={val => this.setState({ selectedConsultSubject: val })}
            disabled={!this.state.selectedUnit.length}
            cols={1}
            extra="请选择事项"
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
            value={this.state.title}
            onChange={(e) => this.setState({title: e.target.value})}
          />
        </Flex>
        <textarea
          placeholder="请输入内容"
          value={this.state.content}
          onChange={(e) => this.setState({content: e.target.value})}
          className="textArea"
          name=""
          id=""
          rows="10"
        />
        <div style={{ marginTop: 20, padding: "0 15px" }}>
          <Button type="primary" onClick={() => this.submit()}>提交</Button>
        </div>
      </MakeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  unitList: state.getIn(["makeCenter", "unitList"]).toArray(),
  consultSubjectList: state
    .getIn(["makeCenter", "consultSubjectList"])
    .toArray()
});

const mapDispatchToProps = {
  fetchUnitList,
  fetchConsultSubject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Make);
