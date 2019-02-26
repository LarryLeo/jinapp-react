import React, { Component } from 'react'
import { Tabs, ListView, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { updateHistory, requestHistoryData } from '../../actions/index'
import { HistoryWrapper } from './style'

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
})
const calledName = {sug: 'mySuggestions', cons: 'myConsultations'}
class History extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <HistoryWrapper>
        <Tabs tabs={[{title:'我的建议'}, {title: '我的咨询'}]}
          tabBarInactiveTextColor='#888'
          initialPage={0}
          prerenderingSiblingsNumber={false}
        >
          <div>我的建议列表
            <Button onClick={() => this.props.requestHistoryData(calledName.sug)} type='primary' size='small'>Fetch</Button>
            <Button onClick={() => this.props.updateHistory(calledName.sug)} type='primary' size='small'>Update</Button>
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
