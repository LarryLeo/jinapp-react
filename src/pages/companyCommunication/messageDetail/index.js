import React, { Component } from "react";
import { MessageList, ReplyBar, UploadImagePreview } from "./style";
import { ListView, Flex, Button, PullToRefresh, Toast } from "antd-mobile";
import queryString from "query-string";
import { requestGet, requestPost } from "../../../utils/utils";
import { IoMdImage, IoIosCloseCircle } from "react-icons/io";
import ImageViewer from "react-viewer";
import "react-viewer/dist/index.css";

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
const reader = new FileReader();
const myAvatar = JSON.parse(localStorage.getItem("memberInfo")).avatar;
const userCredential = JSON.parse(localStorage.getItem("userCredential"));
export default class MessageDetail extends Component {
  state = {
    pn: 1,
    ps: 10,
    chatDetail: [],
    loading: false,
    noMoreData: false,
    viewerVisible: false,
    currentViewImage: "",
    displayImages: [],
    selectedImages: [],
    inputValue: ""
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
      <img
        key={index}
        src={item}
        className="chatImage"
        alt="chatImg"
        onClick={() => {
          this.setState({ currentViewImage: item });
          this.toggleViewerVisible();
        }}
      />
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
  toggleViewerVisible = () => {
    this.setState({
      viewerVisible: !this.state.viewerVisible
    });
  };
  pickImages = e => {
    let files = e.target.files;
    if (this.state.displayImages.length === 4 || files.length > 4)
      return Toast.show("最多上传4张图片");
    let displayImages = [];
    let fileIndex = 0;
    if (!files.length) return;
    reader.readAsDataURL(files[fileIndex]);
    reader.onloadend = () => {
      displayImages.push(reader.result);
      fileIndex++;
      if (fileIndex < files.length) {
        reader.readAsDataURL(files[fileIndex]);
      } else {
        console.log("全部终了");
        console.log(displayImages);
        this.setState({
          selectedImages: [...this.state.selectedImages, ...files],
          displayImages: [...this.state.displayImages, ...displayImages]
        });
      }
    };
  };
  // 删除图片
  removeImage = index => {
    this.setState({
      selectedImages: [
        ...this.state.selectedImages.slice(0, index),
        ...this.state.selectedImages.slice(index + 1)
      ],
      displayImages: [
        ...this.state.displayImages.slice(0, index),
        ...this.state.displayImages.slice(index + 1)
      ]
    });
  };
  renderDisplayImages = () => {
    if (!this.state.displayImages.length) return;
    console.log("显然图片");
    return this.state.displayImages.map((item, index) => (
      <div key={index} className="uploadImgWrapper">
        <img src={item} alt="" />
        <IoIosCloseCircle
          size={20}
          color="rgba(0,0,0,0.7)"
          className="close"
          onClick={() => this.removeImage(index)}
        />
      </div>
    ));
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
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.loading}
              onRefresh={() => this.fetchMessages()}
            />
          }
          style={{
            height: document.documentElement.clientHeight - 45,
            backgroundColor: "#f5f6fa"
          }}
        />
        <UploadImagePreview>{this.renderDisplayImages()}</UploadImagePreview>
        <ReplyBar>
          <label htmlFor="imgUploadBtn">
            <IoMdImage
              size={24}
              color={this.state.displayImages.length ? "#007aff" : "#888"}
              className="uploadImageIcon"
            />
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            multiple
            id="imgUploadBtn"
            onChange={e => this.pickImages(e)}
          />
          <input
            className="input"
            type="text"
            placeholder="回复..."
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })}
          />
          <div className="button">
            <Button type="primary" size="small">
              发送
            </Button>
          </div>
        </ReplyBar>
        {/* 测试图片浏览 */}
        <div>
          <ImageViewer
            visible={this.state.viewerVisible}
            noToolbar={true}
            noFooter={true}
            onMaskClick={() => this.toggleViewerVisible()}
            onClose={() => this.toggleViewerVisible()}
            images={[{ src: this.state.currentViewImage, alt: "" }]}
          />
        </div>
      </MessageList>
    );
  }
}
