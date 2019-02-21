import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'antd/lib/button'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to='/'>
          <Button type='primary'>首页</Button>
        </Link>
        <Link to='/service'>江津政务</Link>
        <Link to='/my'>我的</Link>
      </div>
    )
  }
}
