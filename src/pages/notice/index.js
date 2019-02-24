import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ListView, PullToRefresh } from 'antd-mobile'

const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
    })

console.log('测试')

const mockData = [{
      title: 'AA',
      content: 'aabbcccaaaa'
    },{
      title: 'BB',
      content: 'bbcccbajsjjj'
    },
    {
      title: 'BB',
      content: 'bbcccbajsjjj'
    },{
      title: 'BB',
      content: 'bbcccbajsjjj'
    },
    {
      title: 'BB',
      content: 'bbcccbajsjjj'
    },
    {
      title: 'BB',
      content: 'bbcccbajsjjj'
    },
    {
      title: 'BB',
      content: 'bbcccbajsjjj'
    }]
export default class Notice extends Component {

  state = {
    dataSource: dataSource.cloneWithRows({})
  }

  renderData = (data) => {
    console.log(data)
    return <p style={{height: '100px', width: '100%', backgroundColor:'red'}}>{data.title}</p>
  }

  fetchData = () => {
    this.setState({
      dataSource: dataSource.cloneWithRows([{title: '欣椎', content:'新增内容'},{title:'是这样', content:'的吗'}])
    })
  }

  componentDidMount() {
    console.log('mount阶段')
    this.setState({
      dataSource: dataSource.cloneWithRows(mockData)
    })
  }

  render() {
    return (
      <div style={{}}>
      <h2 onClick={() => this.fetchData()}>追加新数据</h2>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderData}
          onEndReachedThreshold={50}
          onEndReached={() => console.log('到底啦')}
          pullToRefresh={<PullToRefresh refreshing={true} onRefresh={() => console.log('刷新中')} />}
          renderSeparator={(sectionID, rowID) => <div key={rowID} style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}></div>}
          style={{height: (document.documentElement.clientHeight-45), backgroundColor: 'yellow'}}
        />
        <p>
          <Link to='/notice/detail'>跳转至详情</Link>
        </p>
      </div>
    )
  }
}
