import React, { Component } from "react";
import {
  Tabs,
  Flex,
  Button,
  Toast,
  ListView,
  PullToRefresh
} from "antd-mobile";
import { Link } from "react-router-dom";
import * as qiniu from "qiniu-js";
import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { Communication, ChatList } from "./style";
import { requestGet, requestPost } from "../../utils/utils";
import { connect } from "react-redux";
import {
  updateChatList,
  fetchChatList,
  cacheCompanyActiveTabIndex
} from "../../actions/index";
import moment from "moment";
import "moment/locale/zh-cn";

const userCredential = JSON.parse(localStorage.getItem("userCredential"));
const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
const reader = new FileReader();
class CompanyCommunication extends Component {
  state = {
    selectedImages: [],
    uploadedImages: [],
    displayImages: [],
    uploadToken: "",
    content: ""
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
  // 渲染显示图片
  renderDisplayImages = () => {
    if (this.state.displayImages.length) {
      return this.state.displayImages.map((img, i) => (
        <div className="displayImgWrapper" key={i}>
          <img className="displayImg" src={img} alt="img" />
          <IoIosCloseCircle
            onClick={() => this.removeImage(i)}
            size={20}
            color="rgba(0,0,0,0.7)"
            className="close"
          />
        </div>
      ));
    } else {
      return <span />;
    }
  };

  // 测试七牛上传
  sendMessage = async () => {
    // 发送参数完整性校验
    if (!this.props.selectedCompany.id) return Toast.show("请选择联系企业");
    if (!this.props.selectedPerson.id) return Toast.show("请选择联系人");
    if (!this.state.content) return Toast.show("内容不能为空");

    let res = await requestPost({
      apiUrl: "/app/v1/chat/sendMessage",
      data: {
        ...userCredential,
        to_company_id: this.props.selectedCompany.id,
        to_member_id: this.props.selectedPerson.id,
        imgs: this.state.uploadedImages.join(),
        content: this.state.content
      }
    });
    if (res.success) {
      Toast.success("发送成功");
      this.props.updateChatList();
      this.setState({
        content: "",
        selectedImages: [],
        displayImages: [],
        uploadedImages: []
      });
      setTimeout(() => {
        this.props.history.push({
          pathname: "/communication/message",
          search: `?chat_id=${res.chat_id}`,
          state: {
            title: "消息详情"
          }
        });
      }, 1000);
    }
  };
  sendMessageWithImages = async () => {
    let res = await requestGet({
      apiUrl: "/app/v1/file/uploadToken",
      data: { has_key: 0 }
    });
    let token = res.data.upload_token;

    let uploadedImages = [];
    let config = {
      region: qiniu.region.z2
    };
    for (let i = 0; i < this.state.selectedImages.length; i++) {
      // 对必要参数进行配置
      let file = this.state.selectedImages[i];
      let key = `jinapp/${file.name}`;
      let putExtra = {
        fname: file.name,
        params: {},
        mimeType: ["image/png", "image/jpeg", "image/gif"] || null
      };
      let observable = qiniu.upload(file, key, token, putExtra, config);

      observable.subscribe({
        next: res => console.log(),
        error: err => console.log(),
        complete: res => {
          uploadedImages.push(`http://jinshang-test.chimukeji.com/${res.key}`);
          if (uploadedImages.length === this.state.selectedImages.length) {
            this.setState({ uploadedImages });
            this.sendMessage();
          }
        }
      });
    }
  };

  pickImage = e => {
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
        this.setState({
          selectedImages: [...this.state.selectedImages, ...files],
          displayImages: [...this.state.displayImages, ...displayImages]
        });
      }
    };
  };
  allowJumpTo = () => {
    if (this.props.selectedCompany.id) {
      this.props.history.push({
        pathname: "/communication/personlist",
        state: {
          title: "选择联系人"
        }
      });
    } else {
      Toast.show("请选择联系企业");
    }
  };
  // 聊天列表
  renderChatList = (rData, s1, r1) => {
    return (
      <Flex
        className="chatListItem"
        onClick={() =>
          this.props.history.push({
            pathname: "/communication/message",
            search: `?chat_id=${rData.id}`,
            state: {
              title: "消息详情"
            }
          })
        }
      >
        <img src={rData.member.head_img} alt="" className="memberAvatar" />
        <div className="messageContent">
          <div className="userInfo">
            <p className="companyName">
              {rData.company ? rData.company.company : "未知"}
            </p>
            <span className="memberName">
              {rData.member.realname || "未知"}
            </span>
          </div>
          <p className="lastMessage">{rData.last_message_summary}</p>
        </div>
        <span className="time">
          {moment(rData.last_message_at)
            .locale("zh-cn")
            .fromNow()}
        </span>
      </Flex>
    );
  };
  componentDidMount() {
    this.props.fetchChatList();
  }
  render() {
    return (
      <Communication>
        <section className="tabs">
          <Tabs
            tabs={[{ title: "联系企业" }, { title: "我的消息" }]}
            tabBarInactiveTextColor="#888"
            initialPage={0}
            page={this.props.activeTabIndex}
            onChange={(tab, index) =>
              this.props.cacheCompanyActiveTabIndex(index)
            }
            prerenderingSiblingsNumber={false}
          >
            <section className="company">
              <Link
                to={{
                  pathname: "/communication/companies",
                  state: {
                    title: "选择企业"
                  }
                }}
              >
                <Flex justify="between" className="pickerItem">
                  <span className="key">企业</span>
                  <span className="value">
                    {this.props.selectedCompany.name}
                  </span>
                </Flex>
              </Link>
              <Flex
                onClick={() => this.allowJumpTo()}
                justify="between"
                className="pickerItem"
              >
                <span className="key">联系人</span>
                <span className="value">{this.props.selectedPerson.name}</span>
              </Flex>
              <textarea
                placeholder="发现商机，拓展客户"
                value={this.state.content}
                onChange={e => this.setState({ content: e.target.value })}
                className="textArea"
                rows="10"
              />
              <Flex className="imgUpload" wrap={true}>
                {this.renderDisplayImages()}
                <div className="icon">
                  <label htmlFor="imgUploadBtn">
                    <FiUpload size={24} />
                  </label>
                  <input
                    style={{ display: "none" }}
                    id="imgUploadBtn"
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={e => this.pickImage(e)}
                  />
                </div>
              </Flex>
              <div className="submit">
                <Button
                  type="primary"
                  onClick={() =>
                    this.state.selectedImages.length
                      ? this.sendMessageWithImages()
                      : this.sendMessage()
                  }
                >
                  提交
                </Button>
              </div>
            </section>
            <ChatList>
              <ListView
                dataSource={dataSource.cloneWithRows(
                  this.props.chatList.get("data").toArray()
                )}
                renderRow={this.renderChatList}
                renderSeparator={(sid, rid) => (
                  <div
                    key={sid + rid}
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#d1d1d17a"
                    }}
                  />
                )}
                renderFooter={() =>
                  this.props.chatList.get("noMoreData") && (
                    <p style={{ textAlign: "center" }}>到底了</p>
                  )
                }
                pullToRefresh={
                  <PullToRefresh
                    refreshing={this.props.chatList.get("loading")}
                    onRefresh={() => this.props.updateChatList()}
                  />
                }
                onEndReachedThreshold={30}
                onEndReached={() => this.props.fetchChatList()}
                style={{ height: document.documentElement.clientHeight - 110 }}
              />
            </ChatList>
          </Tabs>
        </section>
      </Communication>
    );
  }
}
const mapStateToProps = state => ({
  selectedCompany: state.getIn(["companies", "selectedCompany"]).toObject(),
  selectedPerson: state.getIn(["companies", "selectedPerson"]).toObject(),
  chatList: state.get("chatList"),
  activeTabIndex: state.getIn(["companies", "activeTabIndex"])
});
const mapDispatchToProps = {
  updateChatList,
  fetchChatList,
  cacheCompanyActiveTabIndex
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyCommunication);
