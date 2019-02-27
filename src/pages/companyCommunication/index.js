import React, { Component } from 'react'
import { Tabs, Flex, Picker, Button, Toast } from 'antd-mobile'
import { FiUpload } from 'react-icons/fi'
import { Communication } from './style'

const PickerChildren = props => (
  // 自定义pickerChildren
  <div onClick={props.onClick} className="pickerChildren">
    <div className="inlineWrapper">
      <div className="pickerKey">{props.children}</div>
      <div className="pickerVal">{props.extra}</div>
    </div>
  </div>
);
export default class CompanyCommunication extends Component {
  render() {
    return (
      <Communication>
        <section className='tabs'>
          <Tabs
            tabs={[{ title: "联系企业" }, { title: "我的消息" }]}
            tabBarInactiveTextColor="#888"
            initialPage={0}
            prerenderingSiblingsNumber={false}
          >
            <section className='company'>
              <Flex justify='between' className='pickerItem'>
                <span className='key'>企业</span>
                <span className='value'>请选择联系企业</span>
              </Flex>
              <Flex justify='between' className='pickerItem'>
                <span className='key'>联系人</span>
                <span className='value'>请选择联系人</span>
              </Flex>
              <textarea
                placeholder="发现商机，拓展客户"
                value=''
                onChange={(e) => console.log(e.target.value)}
                className="textArea"
                rows="10"
              />
              <Flex className='imgUpload'>
                <div className='icon'>
                  <FiUpload size={24} />
                </div>
              </Flex>
              <div className='submit'>
              <Button type='primary'>提交</Button>
            </div>
            </section>
            <section className='chat'>
              消息记录
            </section>
          </Tabs>
        </section>
      </Communication>
    )
  }
}
