import React, { Component } from "react";
import { List, Button } from "antd-mobile";
import { MyCenter } from './style'
import defualtAvatar from '../../assets/images/avatar.jpg'

const { Item, Brief } = List;
export default class My extends Component {
  componentDidMount() {
    // 用户凭据存入本地
    if (!localStorage.getItem("userCredential")) {
      let userCredential = {
        member_id: 387,
        member_token: "6AB00674C84F52118AD8E99D6FE4B669"
      };
      localStorage.setItem("userCredential", JSON.stringify(userCredential));
    }
    if (!localStorage.getItem("memberInfo")) {
      let memberInfo = {
        avatar:
          "http://img.ecyss.com/character/201704/b042bcea67ec4bcf8a8939d3422df0ec.jpg"
      };
      localStorage.setItem("memberInfo", JSON.stringify(memberInfo));
    }
  }
  render() {
    return (
      <MyCenter>
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
          <Button type='warning'>退出登录</Button>
        </div>
      </MyCenter>
    );
  }
}
