import React, { Component } from 'react'
import { GlobalStyle } from './style'
import { fromJS } from 'immutable'

const HistoryInitialState = {
  pn: 1,
  ps: 5,
  loading: false,
  needFresh: false,
  noMoreData: false,
  data: [1,2,3,4,5, {nested: 'nes'}]
}
export default class App extends Component {

  renderList = () => {
    let imData = fromJS(HistoryInitialState)
    return imData.getIn(['data']).slice(0,5).map((item,index) => (
      <li key={index}>{item}</li>
    ))
  }
  componentDidMount() {
    let imData = fromJS(HistoryInitialState)
    // let imData2 = fromJS(HistoryInitialState)
    console.log(imData.getIn(['data']).slice(0,5).map(item => item*2))
  }
  render() {
    return (
      <div>
        <GlobalStyle />
        <p>Hello World</p>
        <p>默认样式测试</p>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}
