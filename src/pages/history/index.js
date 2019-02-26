import React, { Component } from 'react'
import { Tabs, ListView, Flex, PullToRefresh } from 'antd-mobile'
import { connect } from 'react-redux'
import { updateHistory, requestHistoryData } from '../../actions/index'
import { HistoryWrapper } from './style'

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
})
const calledName = {sug: 'mySuggestions', cons: 'myConsultations'}
class History extends Component {
  // 渲染建议记录
  renderSuggestions = (rData, sId, rId) => (
    <div className='listItem'>
      <Flex justify='between' className='header'>
        <div className='left'>
          <span className='key'>意见对象</span>
          <span className='unit'>{rData.unit.unit_name}</span>
        </div>
        <span className='status'>已完成</span>
      </Flex>
      <Flex className='row'>
        <span className='key'>主题</span>
        <span className='value'>{rData.title}</span>
      </Flex>
      <Flex className='row'>
        <span className='key'>描述</span>
        <span className='value'>{rData.content}</span>
      </Flex>
      <Flex>
        <span className='key'>评分</span>
        <div className='rate'>星星</div>
      </Flex>
    </div>
  )
  // 渲染咨询记录
  renderConsultations = (rData, sId, rId) => {

  }
  componentDidMount() {
    this.props.requestHistoryData(calledName.sug)
  }
  render() {
    return (
      <HistoryWrapper>
        <Tabs tabs={[{title:'我的建议'}, {title: '我的咨询'}]}
          tabBarInactiveTextColor='#888'
          initialPage={0}
          prerenderingSiblingsNumber={false}
        >
          <div className='list'>
            <ListView
              dataSource={dataSource.cloneWithRows(
                this.props.mySuggestions.get('data').toArray()
              )}
              renderRow={this.renderSuggestions}
              style={{height: document.documentElement.clientHeight - 115}}
              pullToRefresh={<PullToRefresh refreshing={this.props.mySuggestions.get('loading')} onRefresh={() => this.props.updateHistory(calledName.sug)} />}
              onEndReachedThreshold={10}
              onEndReached={() => this.props.requestHistoryData(calledName.sug)}
            />
          </div>
          <div>我的咨询列表</div>
        </Tabs>
      </HistoryWrapper>
    )
  }
}
const mapStateToProps = (state) => ({
  mySuggestions: state.get('mySuggestions'),
  myConsultations: state.get('myConsultations')
})

const mapDispatchToProps = {
  updateHistory,
  requestHistoryData
}


export default connect(mapStateToProps, mapDispatchToProps)(History)
