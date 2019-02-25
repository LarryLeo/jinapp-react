import React, { Component } from 'react'
import { MakeWrapper } from './style'
import { Flex } from 'antd-mobile'
import { Link } from 'react-router-dom'

export default class Make extends Component {
  renderHistoryJump = () => {
    const { params:{type} } = this.props.match
    switch(type) {
      case 'suggestion':
        return <Link to='/history'>
          <span>意见历史</span>
        </Link>
      case 'consultation':
        return <span>咨询历史</span>
      default:
        return <span>意见历史</span>
    }

  }
  componentDidMount() {

  }
  render() {
    return (
      <MakeWrapper>
        <Flex>
          {this.renderHistoryJump()}
        </Flex>
      </MakeWrapper>
    )
  }
}
