import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Notice extends Component {
  render() {
    return (
      <div>
        政策宣传
        <p>
          <Link to='/notice/detail'>跳转至详情</Link>
        </p>
      </div>
    )
  }
}
