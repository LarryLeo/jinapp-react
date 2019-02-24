import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListView, PullToRefresh, Flex, Toast } from "antd-mobile";
import { connect } from 'react-redux'
import { cacheNoticeState, fetchNoticeData, updateNoticeData } from '../../actions/index'
import { requestGet } from "../../utils/utils";

import { NoticeList } from "./style";
import iconNotice from "../../assets/images/notice-icon.jpg";

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});
class Notice extends Component {

  renderRow = (rowData, sectionId, rowId) => {
    return (
      <Link
        to={{
          pathname: "/notice/detail",
          search: `id=${rowData.id}`,
          state: {
            title: '详情'
          }
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

    this.props.fetchNoticeData()
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <NoticeList>
        <ListView
          dataSource={dataSource.cloneWithRows(this.props.noticeState.get('noticeData').toArray())}
          renderRow={this.renderRow}
          renderSeparator={(sId, rId) => (
            <div
              style={{ height: "1px", backgroundColor: "#f1f1f1" }}
              key={rId}
            />
          )}
          pullToRefresh={<PullToRefresh refreshing={this.props.noticeState.get('loading')} onRefresh={() => this.props.updateNoticeData()} />}
          style={{ height: document.documentElement.clientHeight - 90, width: '100%' }}
        />
      </NoticeList>
    );
  }
}

const mapStateToProps = (state) => ({
  noticeState: state.get('noticeState')
})

const mapDispatchToProps = {
  cacheNoticeState,
  fetchNoticeData,
  updateNoticeData
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice)
