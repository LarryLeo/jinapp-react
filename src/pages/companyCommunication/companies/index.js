import React, { Component } from 'react'
import { ListView, List, SearchBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { fetchCompanies } from '../../../actions/index'


const { Item } = List
const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
  getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID]
})
class CompanyList extends Component {
  state = {
    dataSource: {}
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
    console.log(dataBlob, sectionIDs, rowIDs)
    return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
  }
  _renderRow = (rData, s1, r1) => {
    console.log(rData, s1, r1)
    return <Item>{rData.company}</Item>
  }
  _renderSectionHeader = (sData, sid) => {
    console.log(sData)
    return <p>{sData}</p>
  }
  componentDidMount() {
    this.props.fetchCompanies()
  }
  render() {
    return (
      <div>
        企业列表
        <ListView
          dataSource={this.genDataSource(this.props.companies)}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderSectionHeader}
          style={{height: 500}}
         />
      </div>
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
