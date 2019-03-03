import React, { Component } from "react";
import { List, Button } from "antd-mobile";
import { MyCenter } from "./style";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkLogin } from "../../actions/index";
import { requestGet } from "../../utils/utils";
import defaultAvatar from "../../assets/images/avatar_placeholder.png";

const { Item, Brief } = List;
class My extends Component {
  state = {
    memberInfo: {}
  };
  logout = () => {
    localStorage.removeItem("userCredential");
    localStorage.removeItem("memberInfo");
    this.props.checkLogin(false);
    this.setState({
      memberInfo: {}
    });
  };
  saveUserInfo = ({ mobile, realname }) => {
    let memberInfo = {
      mobile,
      realname,
      avatar:
        "http://img.ecyss.com/character/201704/b042bcea67ec4bcf8a8939d3422df0ec.jpg"
    };
    localStorage.setItem("memberInfo", JSON.stringify(memberInfo));
    this.setState({
      memberInfo
    });
  };
  fetchUserInfo = async () => {
    let memberInfo = JSON.parse(localStorage.getItem("memberInfo"));
    if (memberInfo) {
      return this.setState({
        memberInfo
      });
    }
    const userCredential = JSON.parse(localStorage.getItem("userCredential"));
    let res = await requestGet({
      apiUrl: "/app/v1/member/view",
      data: {
        ...userCredential
      }
    });
    res.success && this.saveUserInfo(res.data);
  };
  componentDidMount() {
    console.log("我的");
    this.fetchUserInfo();
  }
  render() {
    return (
      <MyCenter isLogin={this.props.loginState}>
        <div className="userInfoPanel">
          <img
            className="avatar"
            src={this.state.memberInfo.avatar || defaultAvatar}
            alt=""
          />
          <div className="inlineWrapper">
            <p className="userName">
              {this.state.memberInfo.realname || "未登录"}
            </p>
            <p className="mobile">{this.state.memberInfo.mobile || ""}</p>
          </div>
        </div>
        <List style={{ marginBottom: 10 }}>
          <Item
            thumb="http://jz.test.chimukeji.com/assets/web/img/icon-advice.png"
            arrow="horizontal"
            onClick={() =>
              this.props.history.push({
                pathname: "/my/history",
                state: {
                  title: "我的历史",
                  initialPage: 0
                }
              })
            }
          >
            我的建议
          </Item>
          <Item
            thumb="http://jz.test.chimukeji.com/assets/web/img/icon-consult.png"
            onClick={() =>
              this.props.history.push({
                pathname: "/my/history",
                state: {
                  title: "我的历史",
                  initialPage: 1
                }
              })
            }
            arrow="horizontal"
          >
            我的咨询
          </Item>
        </List>
        <List>
          <Item
            thumb="http://jz.test.chimukeji.com/assets/web/img/icon-about.png"
            arrow="horizontal"
            onClick={() => console.log("object")}
          >
            关于
          </Item>
        </List>
        <div className="button">
          <Button
            onClick={() => this.logout()}
            className="logout"
            type="warning"
          >
            退出登录
          </Button>
          <Button
            onClick={() => {
              this.props.history.push("/login");
            }}
            className="login"
            type="primary"
          >
            登录
          </Button>
        </div>
      </MyCenter>
    );
  }
}

const mapStateToProps = state => ({
  loginState: state.getIn(["loginState", "login"])
});

const mapDispatchToProps = {
  checkLogin
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(My)
);
