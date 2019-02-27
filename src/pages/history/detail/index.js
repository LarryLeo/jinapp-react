import React, { Component } from "react";
import { Flex, ListView, Button, Modal, Toast } from "antd-mobile";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { requestGet, requestPost } from "../../../utils/utils";
import { connect } from "react-redux";
import { updateHistory } from "../../../actions/index";

import { Wrapper, RateModal } from "./style";
import avatarPlaceHolder from "../../../assets/images/avatar.jpg";
import coverRate from "../../../assets/images/rate-cover.png";

const userCredential = JSON.parse(localStorage.getItem("userCredential"));
const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
const prompt = Modal.prompt;
class HistoryDetail extends Component {
  state = {
    replyList: [],
    showRateModal: false,
    starsOnNum: 5
  };
  // 渲染状态
  handleStatus = item => {
    const statusDesc = ["待回复", "已回复", "已完成"];
    const statusStylesArr = [
      { backgroundColor: "#fd714e" },
      { backgroundColor: "#0093ff" },
      { backgroundColor: "gray" }
    ];

    return (
      <span style={statusStylesArr[item.status]} className="status">
        {statusDesc[item.status]}
      </span>
    );
  };
  // 渲染评分
  handleRating = (onNum, actionType) => {
    const defaultStarsNum = 5;
    // 默认显示5个空白五星
    const starsTotalArr = [1, 2, 3, 4, 5];
    // 一个长度等于默认星星总数的dummy数组，用于map渲染
    const starsOnNum = onNum;
    // 传入的点亮的星数
    const starsOnNumArr = starsTotalArr.slice(defaultStarsNum - starsOnNum);
    const starsOffNumArr = starsTotalArr.slice(starsOnNum);
    let iconSize = actionType ? 24 : 16;
    return (
      <div className="rate">
        {starsOnNumArr.map((star, index) => (
          <IoIosStar
            size={iconSize}
            color="#FF943E"
            key={index}
            onClick={() =>
              this.setState({
                starsOnNum: index + 1
              })
            }
          />
        ))}
        {starsOffNumArr.map((star, index) => (
          <IoIosStarOutline
            size={iconSize}
            color="#bbbbbb"
            key={index}
            onClick={() =>
              this.setState({
                starsOnNum: this.state.starsOnNum + index + 1
              })
            }
          />
        ))}
      </div>
    );
  };
  // 获取回复数据
  fetchReplyList = async () => {
    const {
      state: { apiUrl, apiParams }
    } = this.props.location;
    let res = await requestGet({
      apiUrl,
      data: { ...apiParams, ...userCredential }
    });
    res.success &&
      this.setState({
        replyList: res.data.list
      });
  };
  _renderRow = (rData, sId, rId) => {
    if (rData.reply_type === "answer") {
      return (
        <Flex className="itemWrapper itemWrapper-answer">
          <img
            style={{ marginRight: 10 }}
            className="avatar"
            src={avatarPlaceHolder}
            alt=""
          />
          <p className="content content-answer">{rData.content}</p>
        </Flex>
      );
    } else if (rData.reply_type === "question") {
      return (
        <Flex justify="end" className="itemWrapper itemWrapper-question">
          <p className="content content-question">{rData.content}</p>
          <img
            style={{ marginLeft: 10 }}
            className="avatar"
            src={avatarPlaceHolder}
            alt=""
          />
        </Flex>
      );
    }
  };

  sendMessage = content =>
    new Promise(resolve => {
      const {
        state: { askUrl, apiParams }
      } = this.props.location;
      if (!content.length) return Toast.show("内容不能为空");
      requestPost({
        apiUrl: askUrl,
        data: { ...apiParams, ...userCredential, content }
      }).then(res => {
        if (res.success) {
          Toast.show("发送成功");
          // 发送后直接更新state，免请求
          this.setState({
            replyList: [
              ...this.state.replyList,
              {
                content,
                reply_type: "question"
              }
            ]
          });
          resolve();
        } else {
          Toast.fail("发送失败");
        }
      });
    });
  submitRate = async () => {
    const {
      state: { rateUrl, apiParams, calledName }
    } = this.props.location;
    let res = await requestPost({
      apiUrl: rateUrl,
      data: { ...apiParams, ...userCredential, star: this.state.starsOnNum }
    });
    if (res.success) {
      Toast.success("提交成功");
      this.props.updateHistory(calledName);
      this.toggleRateModal();
      setTimeout(() => {
        this.props.history.goBack();
      }, 1000);
    } else {
      Toast.fail("提交失败");
    }
  };
  toggleRateModal = () => {
    this.setState({ showRateModal: !this.state.showRateModal });
  };
  componentDidMount() {
    this.fetchReplyList();
  }
  render() {
    const {
      state: { rData }
    } = this.props.location;
    const {
      params: { type }
    } = this.props.match;
    return (
      <Wrapper isFinished={this.props.location.state.rData.status === 2}>
        <section className="listItem">
          <Flex justify="between" className="header">
            <div className="left">
              <span className="key">
                {type === "suggestion-detail" ? "意见" : "咨询"}对象
              </span>
              <span className="unit">{rData.unit.unit_name}</span>
            </div>
            {this.handleStatus(rData)}
          </Flex>
          <Flex className="row">
            <span className="key">主题</span>
            <span className="value">{rData.title}</span>
          </Flex>
          <Flex className="row">
            <span className="key">描述</span>
            <span className="value">{rData.content}</span>
          </Flex>
          <Flex>
            <span style={{ marginBottom: 0 }} className="key">
              评分
            </span>
            {this.handleRating(rData.star)}
          </Flex>
        </section>
        <section className="replyList">
          <ListView
            dataSource={dataSource.cloneWithRows(this.state.replyList)}
            renderRow={this._renderRow}
            // onScroll={(e) => console.log(e.target.scrollTop)}
            style={{ height: document.documentElement.clientHeight - 185 }}
          />
        </section>
        <section className="userOperate">
          <Button
            onClick={() => this.toggleRateModal()}
            className="button"
            type="primary"
          >
            已解决问题
          </Button>
          <Button
            onClick={() =>
              prompt("继续提问", "请输入内容", [
                {
                  text: "取消"
                },
                {
                  text: "确定",
                  onPress: value => this.sendMessage(value)
                }
              ])
            }
            style={{ backgroundColor: "#fff" }}
            className="button"
            type="ghost"
          >
            继续提问
          </Button>
        </section>
        <RateModal
          visible={this.state.showRateModal}
          onClick={() => this.toggleRateModal()}
        >
          <div onClick={e => e.stopPropagation()} className="rateWindow">
            <img className="cover" src={coverRate} alt="coverRate" />
            <span className="title">问题已解决</span>
            <span className="desc">感谢您的参与</span>
            <span className="desc">请为我们的服务做出评价</span>
            <div className="star">
              {this.handleRating(this.state.starsOnNum, "userStar")}
            </div>
            <Button
              onClick={() => this.submitRate()}
              type="primary"
              size="small"
            >
              提交评价
            </Button>
          </div>
        </RateModal>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  updateHistory
};

export default connect(
  null,
  mapDispatchToProps
)(HistoryDetail);
