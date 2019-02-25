import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListView, PullToRefresh, Flex } from "antd-mobile";
import { connect } from 'react-redux'
import { cacheNoticeState, fetchNoticeData, updateNoticeData } from '../../actions/index'


import { NoticeList } from "./style";
import iconNotice from "../../assets/images/notice-icon.jpg";
// todo 上滑加载更多，目前数据量还不够，暂时搁置
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
            title: '详情',
            data: rowData
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
  _renderFooter = () => {
    if(this.props.noticeState.get('noMoreData')) {
      return (
        <p style={{textAlign: 'center'}}>没有更多数据了</p>
      )
    } else {
      return <span></span>
    }
  }
  componentDidMount() {

    this.props.fetchNoticeData()
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
          renderFooter={() => this._renderFooter()}
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
