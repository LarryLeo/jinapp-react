import React, { Component } from "react";
import { Tabs, ListView, Flex, PullToRefresh } from "antd-mobile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateHistory, requestHistoryData } from "../../actions/index";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { HistoryWrapper } from "./style";

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});
const calledName = { sug: "mySuggestions", cons: "myConsultations" };
class History extends Component {
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
  handleRating = (item, actionType) => {
    const defaultStarsNum = 5;
    // 默认显示5个空白五星
    const starsTotalArr = [1, 2, 3, 4, 5];
    // 一个长度等于默认星星总数的dummy数组，用于map渲染
    const starsOnNum = item.star;
    // 传入的点亮的星数
    const starsOnNumArr = starsTotalArr.slice(defaultStarsNum - starsOnNum);
    const starsOffNumArr = starsTotalArr.slice(starsOnNum);

    return (
      <div className="rate">
        {starsOnNumArr.map((star, index) => (
          <IoIosStar size={16} color="#FF943E" key={index} />
        ))}
        {starsOffNumArr.map((star, index) => (
          <IoIosStarOutline size={16} color="#bbbbbb" key={index} />
        ))}
      </div>
    );
  };
  // 渲染建议记录
  renderSuggestions = (rData, sId, rId) => (
    <div className="listItem">
      <Link
        to={{
          pathname: "history/suggestion-detail",
          search: `?id=${rData.id}`,
          state: {
            title: '我的建议',
            apiUrl: '/app/v1/suggestion/getReplyList',
            apiParams: {
              suggestion_id: rData.id
            },
            rData
          }
        }}
      >
        <Flex justify="between" className="header">
          <div className="left">
            <span className="key">意见对象</span>
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
          <span className="key">评分</span>
          {this.handleRating(rData)}
        </Flex>
      </Link>
    </div>
  );
  // 渲染咨询记录
  renderConsultations = (rData, sId, rId) => (
    <div className="listItem">
      <Link
        to={{
          pathname: "history/consultation-detail",
          search: `?id=${rData.id}`,
          state: {
            title: '我的咨询',
            apiUrl: '/app/v1/consult/getReplyList',
            apiParams: {
              consult_id: rData.id
            },
            rData
          }
        }}
      >
        <Flex justify="between" className="header">
          <div className="left">
            <span className="key">咨询对象</span>
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
          <span className="key">评分</span>
          {this.handleRating(rData)}
        </Flex>
      </Link>
    </div>
  );
  componentDidMount() {
    if(this.props.mySuggestions.get('data').size && this.props.myConsultations.get('data').size) return
    this.props.requestHistoryData(calledName.sug);
    this.props.requestHistoryData(calledName.cons);
  }
  render() {
    return (
      <HistoryWrapper>
        <Tabs
          tabs={[{ title: "我的建议" }, { title: "我的咨询" }]}
          tabBarInactiveTextColor="#888"
          initialPage={this.props.location.state.initialPage}
          prerenderingSiblingsNumber={false}
        >
          <div className="list">
            <ListView
              dataSource={dataSource.cloneWithRows(
                this.props.mySuggestions.get("data").toArray()
              )}
              renderRow={this.renderSuggestions}
              style={{ height: document.documentElement.clientHeight - 115 }}
              pullToRefresh={
                <PullToRefresh
                  refreshing={this.props.mySuggestions.get("loading")}
                  onRefresh={() => this.props.updateHistory(calledName.sug)}
                />
              }
              onEndReachedThreshold={30}
              onEndReached={() => this.props.requestHistoryData(calledName.sug)}
              renderFooter={() => {
                if (this.props.mySuggestions.get("noMoreData")) {
                  return <p style={{ textAlign: "center" }}>没有更多数据了</p>;
                } else {
                  return <span />;
                }
              }}
            />
          </div>
          <div className="list">
            <ListView
              dataSource={dataSource.cloneWithRows(
                this.props.myConsultations.get("data").toArray()
              )}
              renderRow={this.renderConsultations}
              style={{ height: document.documentElement.clientHeight - 115 }}
              pullToRefresh={
                <PullToRefresh
                  refreshing={this.props.myConsultations.get("loading")}
                  onRefresh={() => this.props.updateHistory(calledName.cons)}
                />
              }
              onEndReachedThreshold={30}
              onEndReached={() =>
                this.props.requestHistoryData(calledName.cons)
              }
              renderFooter={() => {
                if (this.props.myConsultations.get("noMoreData")) {
                  return <p style={{ textAlign: "center" }}>没有更多数据了</p>;
                } else {
                  return <span />;
                }
              }}
            />
          </div>
        </Tabs>
      </HistoryWrapper>
    );
  }
}
const mapStateToProps = state => ({
  mySuggestions: state.get("mySuggestions"),
  myConsultations: state.get("myConsultations")
});

const mapDispatchToProps = {
  updateHistory,
  requestHistoryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
