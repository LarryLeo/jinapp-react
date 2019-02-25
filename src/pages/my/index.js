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
  }
  render() {
    return (
      <div>
        <p>我的</p>
      </div>
    )
  }
}
