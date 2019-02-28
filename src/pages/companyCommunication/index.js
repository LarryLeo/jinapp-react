import React, { Component } from 'react'
import { Tabs, Flex, Picker, Button, Toast } from 'antd-mobile'
import ImageUploader from 'react-images-upload'
import { FiUpload } from 'react-icons/fi'
import { Communication } from './style'

const reader = new FileReader()
export default class CompanyCommunication extends Component {
  uploadImage = (e) => {
    console.log(e.target.files)
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      console.log(reader.result)
    }
  }
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
                  <label htmlFor="imgUploadBtn">
                    <FiUpload size={24} />
                  </label>
                  <input style={{display: 'none'}} id='imgUploadBtn' multiple type="file" onChange={(e) => this.uploadImage(e)} />
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
