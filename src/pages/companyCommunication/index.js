import React, { Component } from 'react'
import { Tabs, Flex, Picker, Button, Toast } from 'antd-mobile'
import * as qiniu from 'qiniu-js'
import { FiUpload } from 'react-icons/fi'
import { Communication } from './style'
import { requestGet } from '../../utils/utils'

const reader = new FileReader()
export default class CompanyCommunication extends Component {
  state = {
    selectedImage: '',
    uploadedImage: '',
    uploadToken: ''
  }

// 测试七牛上传
  qinUpload = () => {
    // 对必要参数进行配置
    let file = this.state.selectedImage
    let key = `jinapp/${file.name}`
    let token = this.state.uploadToken
    let config = {
      region: qiniu.region.z2,
    }
    let putExtra = {
      fname: file.name,
      params: {},
      mimeType: ["image/png", "image/jpeg", "image/gif"] || null
};
    let observable = qiniu.upload(file, key, token, putExtra, config)

    observable.subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
      complete: res => console.log(res)
    }) // 上传开始
      }

  uploadImage = (e) => {
    console.log(e.target.files)
    this.setState({selectedImage: e.target.files[0]})
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      console.log(reader.result)
    }
  }
  getUploadToken = async() => {
    let res = await requestGet({apiUrl: '/app/v1/file/uploadToken', data: {has_key: 0}})
    res.success && this.setState({uploadToken: res.data.upload_token})
  }
  componentDidMount() {
    this.getUploadToken()
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
              <Button type='primary' onClick={() => this.qinUpload()}>提交</Button>
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
