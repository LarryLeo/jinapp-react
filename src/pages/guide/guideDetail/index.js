import React, { Component } from 'react'
import queryString from 'query-string'
import { SegmentedControl, List } from 'antd-mobile'
import { requestGet } from '../../../utils/utils'

import { DetailWrapper } from './style'

export default class GuideDetail extends Component {
  state = {
    material: [],
    detail: '',
    activeTabIndex: 0
  }
  fetchData = async() => {
    const queryData = queryString.parse(this.props.location.search)
    let res = await requestGet({
      apiUrl: '/app/v1/guide/getGuideInfo',
      data: {
        guide_id: queryData.guide_id
      }
    });
    res.success && this.setState({
      material: res.data.material,
      detail: res.data.detail
    })
  }
  renderListItem = () => {
    return this.state.material.map((item, index) => (
      <List.Item multipleLine wrap extra={item.number} key={index}>
        {item.name}
      </List.Item>)
    )
  }
  componentDidMount() {
    this.fetchData()
  }
  render() {
    return (
      <DetailWrapper activeTabIndex={this.state.activeTabIndex}>
        <div className='tabs-wrapper'>
          <SegmentedControl values={['所需材料', '办事详情']} selectedIndex={this.state.activeTabIndex} onChange={(e) => this.setState({activeTabIndex: e.nativeEvent.selectedSegmentIndex})} className='tabs' />
        </div>
      <div className='content'>
        <div className="material">
          <List>
            {this.renderListItem()}
          </List>
        </div>
        <div style={{maxHeight: document.documentElement.clientHeight - 123}} className="detail" dangerouslySetInnerHTML={{
          __html: this.state.detail
        }}></div>
      </div>
      </DetailWrapper>
    )
  }
}
