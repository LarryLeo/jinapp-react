import React, { Component } from 'react'

export default class NoticeDetail extends Component {
  render() {
    const {location: {state: {data}}} = this.props
    return (
      <div style={{backgroundColor: '#fff'}}>
        <section style={{padding: '20px 15px'}}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold'}}>{data.title}</h2>
          <div style={{display: 'flex', justifyContent: 'flex-end', padding: '20px 0', borderBottom: '1px solid #d1d1d1'}}>{data.updated_at}</div>
        </section>
        <div style={{lineHeight: '1.5rem', padding: '0 15px',color: '#3a3a3a', height: '100%', overflow: 'auto'}} dangerouslySetInnerHTML={{
          __html: data.body
        }}>
        </div>
      </div>
    )
  }
}
