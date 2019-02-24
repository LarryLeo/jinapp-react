import React, { Component } from 'react'

export default class NoticeDetail extends Component {
  render() {
    return (
      <div style={{backgroundColor: '#fff'}}>
        <section style={{padding: '20px 15px'}}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold'}}>重庆市公安局服务民营经济发展新10条</h2>
          <div style={{display: 'flex', justifyContent: 'flex-end', padding: '20px 0', borderBottom: '1px solid #d1d1d1'}}>2018-10-30 13:09:08</div>
        </section>
        <div>
          内容
        </div>
      </div>
    )
  }
}
