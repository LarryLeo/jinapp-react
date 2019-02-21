import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to='/'>首页</Link>
        <Link to='/service'>江津政务</Link>
        <Link to='/my'>我的</Link>
      </div>
    )
  }
}
