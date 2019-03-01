import React, { Component } from 'react'
import { ListView, List, SearchBar, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { fetchPersonList, cacheSelectedPerson } from '../../../actions/index'
import { PersonListWrapper } from './style'

const { Item } = List
const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
  getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID]
})
class PersonList extends Component {
  state = {
    dataSource: dataSource.cloneWithRowsAndSections({}),
    inputVal: ''
  }
  genDataSource = (rawData) => {
    let dataBlob = {},
      sectionIDs = [],
      rowIDs = [];
    // 确定sectionIds
    for (let i = 0; i < rawData.length; i++) {
      let sectionGroup = rawData[i];
      sectionIDs.push(i);
      dataBlob[i] = sectionGroup.region;
      let data = rawData[i].items
      rowIDs[i] = [] // 初始化
      for (let j = 0; j < data.length; j++) {
        rowIDs[i].push(j)
        dataBlob[i + ':' + j] = data[j]
      }
    }
    return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
  }
  _renderRow = (rData, s1, r1) => {
    return <Item onClick={() =>{
      this.props.cacheSelectedPerson({
      name: rData.realname,
      id: rData.id
    })
    this.props.history.goBack()
    }} >{rData.realname}</Item>
  }
  _renderSectionHeader = (sData, sid) => {
    return <p>{sData}</p>
  }
  onSearch = (keyword) => {
    let personData = JSON.parse(JSON.stringify(this.props.personData))
    for(let i = 0; i < personData.length; i++) {
      for(let j = 0; j < personData[i].items.length; j++) {
        if(personData[i].items[j].realname.indexOf(keyword) > -1) continue; // 保留匹配项
        personData[i].items.splice(j--, 1) //删除不匹配项(注意递减，因为删除后数组长度缩短)
      }
      if(!personData[i].items.length) {
        personData.splice(i--, 1) // 如果上面操作导致子数据完全清空，personData也自然要缩减长度
      }
    }
    if(!personData.length) {
      console.log('没有匹配项')

    }
    this.setState({
      inputVal: keyword,
      dataSource: this.genDataSource(personData)
    })

  }
  renderSearchResult = () => {
    if(!this.state.dataSource.rowIdentities.length) {
      return <p className='searchResult'>没有匹配项</p>
    }
  }
  componentDidMount() {
    this.props.fetchPersonList()
     this.setState({
        dataSource: this.genDataSource(this.props.personData)
      })
  }
  componentWillReceiveProps(nextPorps) {
    if(this.props.personData !== nextPorps.personData) {
      this.setState({
        dataSource: this.genDataSource(nextPorps.personData)
      })
    }
  }
  render() {
    return (
      <PersonListWrapper>
        <SearchBar
          value={this.state.inputVal}
          placeholder='搜索...'
          onChange={this.onSearch}
          onClear={() => { console.log('onClear'); }}
          onCancel={() => { console.log('onCancel'); }}
        />
        {this.renderSearchResult()}
        <ListView.IndexedList
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderSectionHeader}
          style={{height: document.documentElement.clientHeight - 92}}
         />
      </PersonListWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  personData: state.getIn(['companies', 'personData']).toArray(),
})

const mapDispatchToProps = {
  fetchPersonList,
  cacheSelectedPerson
}


export default connect(mapStateToProps, mapDispatchToProps)(PersonList)
