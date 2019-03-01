import React, { Component } from 'react'
import { ListView, List, SearchBar, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { fetchCompanies } from '../../../actions/index'
import { ContactList } from './style'

// todo 搜索

const { Item } = List
const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
  getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID]
})
class CompanyList extends Component {
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
    return <Item onClick={() => console.log(rData.id)} >{rData.company}</Item>
  }
  _renderSectionHeader = (sData, sid) => {
    return <p>{sData}</p>
  }
  onSearch = (keyword) => {
    let companies = JSON.parse(JSON.stringify(this.props.companies))
    for(let i = 0; i < companies.length; i++) {
      for(let j = 0; j < companies[i].items.length; j++) {
        if(companies[i].items[j].company.indexOf(keyword) > -1) continue; // 保留匹配项
        companies[i].items.splice(j--, 1) //删除不匹配项(注意递减，因为删除后数组长度缩短)
      }
      if(!companies[i].items.length) {
        companies.splice(i--, 1) // 如果上面操作导致子数据完全清空，companies也自然要缩减长度
      }
    }
    if(!companies.length) {
      console.log('没有匹配项')

    }
    this.setState({
      inputVal: keyword,
      dataSource: this.genDataSource(companies)
    })

  }
  renderSearchResult = () => {
    if(!this.state.dataSource.rowIdentities.length) {
      return <p className='searchResult'>没有匹配项</p>
    }
  }
  componentDidMount() {
    this.props.fetchCompanies()
     this.setState({
        dataSource: this.genDataSource(this.props.companies)
      })
  }
  componentWillReceiveProps(nextPorps) {
    if(this.props.companies !== nextPorps.companies) {
      this.setState({
        dataSource: this.genDataSource(nextPorps.companies)
      })
    }
  }
  render() {
    return (
      <ContactList>
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
      </ContactList>
    )
  }
}

const mapStateToProps = (state) => ({
  companies: state.getIn(['companies', 'data']).toArray()
})

const mapDispatchToProps = {
  fetchCompanies
}


export default connect(mapStateToProps, mapDispatchToProps)(CompanyList)
