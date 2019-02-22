import React, { Component } from 'react'

export default class My extends Component {
  componentDidMount() {
    console.log('我的页面挂载')
  }
  render() {
    return (
      <div>
        <p>我的</p>
      </div>
    )
  }
}
