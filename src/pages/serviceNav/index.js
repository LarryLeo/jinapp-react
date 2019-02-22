import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Service extends Component {
  componentDidMount() {
    console.log('政务页面挂载')
  }
  render() {
    return (
      <div>
        <p>江津政务</p>
        <Link to='/contacts'>
          <p>跳转至警企备忘录</p>
        </Link>
      </div>
    )
  }
}
