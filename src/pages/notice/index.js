import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListView, PullToRefresh, Flex, Toast } from "antd-mobile";
import { requestGet } from "../../utils/utils";

import { NoticeList } from "./style";
import iconNotice from "../../assets/images/notice-icon.jpg";

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});
export default class Notice extends Component {
  state = {
    noticeData: [], //需这样初始化
    pn: 1,
    ps: 10,
    loading: false,
    noMoreData: false
  };

  fetchData = async () => {
    if(this.state.noMoreData) return Toast.show('没有更多数据')
    await this.setState({loading: true})
    let res = await requestGet({
      apiUrl: "/app/v1/index/articleList",
      data: {
        type_id: 3,
        pn: this.state.pn,
        ps: this.state.ps
      }
    });
    let list = res.data.list;
    await this.setState({
      noticeData: [...this.state.noticeData, ...list],
      pn:
        res.data.list.length >= this.state.ps ? ++this.state.pn : this.state.pn,
      loading: false,
      noMoreData: list.length < this.state.ps
    });
  };
  renderRow = (rowData, sectionId, rowId) => {
    return (
      <Link
        to={{
          pathname: "/notice/detail",
          search: `id=${rowData.id}`
        }}
      >
        <Flex style={{ padding: "10px 15px" }}>
          <img className="icon" src={iconNotice} alt="notice" />
          <p className='articleTitle'>{rowData.title}</p>
        </Flex>
      </Link>
    );
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <NoticeList>
        <ListView
          dataSource={dataSource.cloneWithRows(this.state.noticeData)}
          renderRow={this.renderRow}
          renderSeparator={(sId, rId) => (
            <div
              style={{ height: "1px", backgroundColor: "#f1f1f1" }}
              key={rId}
            />
          )}
          pullToRefresh={<PullToRefresh refreshing={this.state.loading} onRefresh={() => this.fetchData()} />}
          style={{ height: document.documentElement.clientHeight - 90, width: '100%' }}
        />
      </NoticeList>
    );
  }
}
