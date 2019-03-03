import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { connect } from "react-redux";
import { checkLogin } from "../../actions/index";
import { requestPost } from "../../utils/utils";
import { LoginForm } from "./style";
class Login extends Component {
  state = {
    counter: 30,
    enableCounter: false,
    mobile: "",
    validate_code: ""
  };
  countDown = () => {
    let sec = this.state.counter;
    setTimeout(() => {
      sec--;
      this.setState({
        counter: sec
      });
      if (sec === 0) {
        this.setState({
          enableCounter: false,
          counter: 30
        });
        return;
      }
      this.countDown();
    }, 1000);
  };
  enableCounter = () => {
    if (this.state.enableCounter) return;
    this.setState({
      enableCounter: true
    });
    this.countDown();
  };
  login = async () => {
    if (!this.state.mobile) return Toast.show("请填写手机号");
    if (!this.state.validate_code) return Toast.show("请填写验证码");
    let res = await requestPost({
      apiUrl: "/app/v1/auth/login",
      data: {
        mobile: this.state.mobile,
        validate_code: this.state.validate_code
      }
    });
    if (res.success) {
      Toast.success("登录成功");
      this.setState({
        mobile: "",
        validate_code: ""
      });
      // 用户凭据存入本地
      let data = res.data;
      let userCredential = {
        member_id: data.member_id,
        member_token: data.member_token
      };
      localStorage.setItem("userCredential", JSON.stringify(userCredential));
      this.props.checkLogin(true);
      setTimeout(() => {
        this.props.history.goBack();
      }, 1000);
    } else {
      Toast.fail("登录失败");
    }
  };
  render() {
    return (
      <LoginForm isCounterRun={this.state.enableCounter}>
        <div className="raw">
          <span className="key">手机号</span>
          <input
            className="input"
            type="tel"
            maxLength="11"
            value={this.state.mobile}
            onChange={e =>
              this.setState({
                mobile: e.target.value
              })
            }
          />
        </div>
        <div className="raw">
          <span className="key">验证码</span>
          <input
            className="input"
            type="tel"
            maxLength="6"
            value={this.state.validate_code}
            onChange={e => {
              this.setState({
                validate_code: e.target.value
              });
            }}
          />
          <div onClick={() => this.enableCounter()} className="vcode">
            {this.state.enableCounter
              ? `${this.state.counter}s后获取`
              : "获取验证码"}
          </div>
        </div>
        <div className="buttonArea">
          <Button
            onClick={() => this.login()}
            style={{ marginRight: 10 }}
            type="primary"
            size="small"
          >
            登录
          </Button>
          <Button type="ghost" size="small">
            注册
          </Button>
        </div>
      </LoginForm>
    );
  }
}

const mapDispatchToProps = {
  checkLogin
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
