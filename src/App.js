import React, { Component } from 'react'
import { GlobalStyle } from './style'
export default class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <p>Hello World</p>
        <p>默认样式测试</p>
        <ul>
          <li>列表样式测试</li>
          <li>列表样式测试</li>
          <li>列表样式测试</li>
          <li>列表样式测试</li>
        </ul>
      </div>
    )
  }
}
