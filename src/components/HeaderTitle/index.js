import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { HeaderTitleWrapper } from './style'

class HeaderTitle extends Component {
  componentDidMount() {

  }
  render() {
    const { location } = this.props
    return (
      <HeaderTitleWrapper>
        {location.state.title}
      </HeaderTitleWrapper>
    )
  }
}

export default withRouter(HeaderTitle)
