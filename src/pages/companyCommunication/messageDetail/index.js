import React, { Component } from "react";
import { MessageList, ReplyBar, UploadImagePreview } from "./style";
import { ListView, Flex, Button } from "antd-mobile";
import queryString from "query-string";
import { requestGet, requestPost } from "../../../utils/utils";
import { IoMdImage, IoIosCloseCircle } from "react-icons/io";

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
const myAvatar = JSON.parse(localStorage.getItem("memberInfo")).avatar;
const userCredential = JSON.parse(localStorage.getItem("userCredential"));
export default class MessageDetail extends Component {
  state = {
    pn: 1,
    ps: 10,
    chatDetail: [],
    loading: false,
    noMoreData: false
  };
  fetchMessages = async () => {
    const queryData = queryString.parse(this.props.location.search);
    if (this.state.noMoreData) return console.log("没有更多");
    this.setState({ loading: true });
    let res = await requestGet({
      apiUrl: "/app/v1/chat/messageList",
      data: {
        ...userCredential,
        chat_id: queryData.chat_id,
        pn: this.state.pn,
        ps: this.state.ps
      }
    });
    // 筛选所需的chatDetail数据
    let chatDetailRaw = res.list;
    let chatDetailMap = chatDetailRaw.map((item, index) => ({
      head_img: item.member.head_img,
      imgs: item.imgs,
      content: item.content,
      direction: item.direction
    }));
    let combinedData = [...chatDetailMap.reverse(), ...this.state.chatDetail];
    this.setState({
      chatDetail: combinedData,
      pn: res.list.length >= this.state.ps ? ++this.state.pn : this.state.pn,
      noMoreData: res.list.length < this.state.ps,
      loading: false
    });
  };
  sendMessage = () => {};
  renderChatImages = imgs => {
    return imgs.map((item, index) => (
      <img key={index} src={item} className="chatImage" alt="" />
    ));
  };
  _renderRow = rData => {
    if (rData.direction === "receive") {
      return (
        <Flex className="itemWrapper itemWrapper-receive">
          <img
            style={{ marginRight: 10 }}
            className="avatar"
            src={rData.head_img}
            alt=""
          />
          <div className="contentWrapper content-receive">
            <p className="chatContent">{rData.content}</p>
            <div className="chatImgWrapper">
              {rData.imgs.length ? this.renderChatImages(rData.imgs) : <span />}
            </div>
          </div>
        </Flex>
      );
    } else if (rData.direction === "send") {
      return (
        <Flex justify="end" className="itemWrapper itemWrapper-send">
          <div className="contentWrapper content-send">
            <p className="chatContent">{rData.content}</p>
            <div className="chatImgWrapper">
              {rData.imgs.length ? this.renderChatImages(rData.imgs) : <span />}
            </div>
          </div>
          <img
            style={{ marginLeft: 10 }}
            className="avatar"
            src={myAvatar}
            alt=""
          />
        </Flex>
      );
    }
  };
  componentDidMount() {
    this.fetchMessages();
  }
  render() {
    return (
      <MessageList>
        <ListView
          dataSource={dataSource.cloneWithRows(this.state.chatDetail)}
          renderRow={this._renderRow}
          style={{
            height: document.documentElement.clientHeight - 45,
            backgroundColor: "#f5f6fa"
          }}
        />
        <UploadImagePreview>
          <div className='uploadImgWrapper'>
            <img src="http://img.ecyss.com/thumbnail/173/173105/98183cf1dce94e58.jpg" alt=""/>
            <IoIosCloseCircle
            size={20}
            color="rgba(0,0,0,0.7)"
            className="close" />
          </div>
          <div className='uploadImgWrapper'>
            <img src="http://img.ecyss.com/thumbnail/173/173105/98183cf1dce94e58.jpg" alt=""/>
          </div>
           <div className='uploadImgWrapper'>
            <img src="http://img.ecyss.com/thumbnail/173/173105/98183cf1dce94e58.jpg" alt=""/>
          </div>
          <div className='uploadImgWrapper'>
            <img src="http://img.ecyss.com/thumbnail/173/173105/98183cf1dce94e58.jpg" alt=""/>
          </div>
        </UploadImagePreview>
        <ReplyBar>
          <IoMdImage size={24} color="#888" className="uploadImageIcon" />
          <input className="input" type="text" placeholder="回复..." />
          <div className="button">
            <Button type="primary" size="small">
              发送
            </Button>
          </div>
        </ReplyBar>
      </MessageList>
    );
  }
}
