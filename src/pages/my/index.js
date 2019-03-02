import React, { Component } from 'react'

export default class My extends Component {
  componentDidMount() {
    // 用户凭据存入本地
    if(!localStorage.getItem('userCredential')) {
      let userCredential = {
        member_id: 387,
        member_token: '6AB00674C84F52118AD8E99D6FE4B669'
      }
      localStorage.setItem('userCredential', JSON.stringify(userCredential))
    }
    if(!localStorage.getItem('memberInfo')) {
      let memberInfo = {
        avatar: 'http://img.ecyss.com/character/201704/b042bcea67ec4bcf8a8939d3422df0ec.jpg'
      }
      localStorage.setItem('memberInfo', JSON.stringify(memberInfo))
    }
  }
  render() {
    return (
      <div>
        <p>我的</p>
      </div>
    )
  }
}
