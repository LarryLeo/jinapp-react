import React, { Component } from "react";
import { Flex, ListView } from "antd-mobile";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { requestGet, requestPost } from '../../../utils/utils'
import { Wrapper } from "./style";
import avatarPlaceHolder from '../../../assets/images/avatar.jpg'

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})
export default class HistoryDetail extends Component {
  state = {
    replyList: []
  }
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
  // 获取回复数据
  fetchReplyList = async() => {
    const userCredential = JSON.parse(localStorage.getItem('userCredential'))
    const {state:{apiUrl,apiParams}} = this.props.location
    let res = await requestGet({
      apiUrl,
      data: {...apiParams, ...userCredential}
    })
    res.success && this.setState({
      replyList: res.data.list
    })
  }
  _renderRow = (rData, sId, rId) => {
    if(rData.reply_type === 'answer') {
      return (
        <Flex className='itemWrapper itemWrapper-answer'>
          <img style={{marginRight: 10}} className='avatar' src={avatarPlaceHolder} alt=""/>
          <p className='content content-answer'>{rData.content}</p>
        </Flex>
      )
    } else if(rData.reply_type === 'question') {
      return (
        <Flex justify='end' className='itemWrapper itemWrapper-question'>
          <p className='content content-question'>{rData.content}</p>
          <img style={{marginLeft: 10}} className='avatar' src={avatarPlaceHolder} alt=""/>
        </Flex>
      )
    }
  }
  componentDidMount() {
    this.fetchReplyList()
  }
  render() {
    const {
      state: { rData }
    } = this.props.location;
    const {
      params: { type }
    } = this.props.match;
    return (
      <Wrapper>
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
            <span className="key">评分</span>
            {this.handleRating(rData)}
          </Flex>
        </section>
        <section className='replyList'>
          <ListView
            dataSource={dataSource.cloneWithRows(this.state.replyList)}
            renderRow={this._renderRow}
            style={{height: document.documentElement.clientHeight - 195}}
          />
        </section>
      </Wrapper>
    );
  }
}
