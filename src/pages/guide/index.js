import React, { Component } from 'react'
import { ListView } from 'antd-mobile'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchGuideData } from '../../actions/index'

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})
class Guide extends Component {
  _renderRow = (rData, sId, rId) => {
    return (
      <Link to={{
        pathname: '/guide/detail',
        search: `guide_id=${rData.id}`,
        state: {
          title: '指南详情'
        }
      }}>
        <div style={{position: 'relative', height: 110, borderRadius: 8, color: '#fff', marginBottom: 10, overflow: 'hidden'}}>
        <img src={rData.cover} style={{width: '100%'}} alt="cover"/>
        <p style={{position: 'absolute', left: 15, top: 20, maxWidth: 150, fontSize: 16, lineHeight: '1.5rem'}}>{rData.title}</p>
      </div>
      </Link>
    )
  }
  componentDidMount() {
    if(this.props.guide.get('data').size) return
    this.props.fetchGuideData()
  }
  render() {
    return (
      <div style={{backgroundColor: '#fff', padding: '15px'}}>
        <h2 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: 30}}>常用指南</h2>
        <div style={{padding: 10}}>
          <ListView
          dataSource={dataSource.cloneWithRows(this.props.guide.get('data').toArray())}
          renderRow={this._renderRow}
          style={{height: 130 * (this.props.guide.get('data').size),
          }}
         />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  guide: state.get('guide')
})

const mapDispatchToProps = {
  fetchGuideData
}

export default connect(mapStateToProps, mapDispatchToProps)(Guide)
