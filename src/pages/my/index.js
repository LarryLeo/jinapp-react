import React, { Component } from "react";
import { List, Button } from "antd-mobile";
import { MyCenter } from './style'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkLogin } from '../../actions/index'
import defualtAvatar from '../../assets/images/avatar.jpg'

const { Item, Brief } = List;
class My extends Component {
  logout = () => {
    localStorage.removeItem('userCredential')
    localStorage.removeItem('memberInfo')
    this.props.checkLogin(false)
    this.setState({
      isLogin: false
    })
  }
  fetchUserInfo = () => {

  }
  componentDidMount() {
  }
  render() {
    return (
      <MyCenter isLogin={this.props.loginState}>
        <div className="userInfoPanel">
          <img className='avatar' src={defualtAvatar} alt=""/>
          <div className='inlineWrapper'>
            <p className="userName">用户名</p>
            <p className="mobile">138070058</p>
          </div>
        </div>
        <List style={{marginBottom: 10}}>
          <Item
            thumb="http://jz.test.chimukeji.com/assets/web/img/icon-advice.png"
            arrow="horizontal"
            onClick={() => console.log("object")}
          >
            我的建议
          </Item>
          <Item
            thumb="http://jz.test.chimukeji.com/assets/web/img/icon-consult.png"
            onClick={() => console.log("object")}
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
        <div className='button'>
          <Button onClick={() => this.logout()} className='logout' type='warning'>退出登录</Button>
          <Button onClick={() => {
            this.props.history.push('/login')
          }} className='login' type='primary'>登录</Button>
        </div>
      </MyCenter>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.getIn(['loginState', 'login'])
})

const mapDispatchToProps = {
  checkLogin
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(My))
