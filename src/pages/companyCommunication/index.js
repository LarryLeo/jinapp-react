import React, { Component } from 'react'
import { Tabs, Flex, Picker, Button, Toast } from 'antd-mobile'
import * as qiniu from 'qiniu-js'
import { FiUpload } from 'react-icons/fi'
import { IoIosCloseCircle } from 'react-icons/io'
import { Communication } from './style'
import { requestGet } from '../../utils/utils'

const reader = new FileReader()
export default class CompanyCommunication extends Component {
  state = {
    selectedImages: [],
    uploadedImages: [],
    displayImages: [],
    uploadToken: ''
  }
  // 删除图片
  removeImage = (index) => {
    this.setState({
      selectedImages: [...this.state.selectedImages.slice(0,index), ...this.state.selectedImages.slice(index + 1)],
      displayImages: [...this.state.displayImages.slice(0,index), ...this.state.displayImages.slice(index + 1)]
    })
  }
  // 渲染显示图片
  renderDisplayImages = () => {
    if(this.state.displayImages.length) {
      return this.state.displayImages.map((img, i) => (
        <div className='displayImgWrapper' key={i}>
          <img className='displayImg' src={img} alt="img" />
          <IoIosCloseCircle onClick={() => this.removeImage(i)} size={20} color='rgba(0,0,0,0.7)' className='close' />
        </div>
      ))
    } else {
      return <span></span>
    }
  }

  // 测试七牛上传
  qinUpload = () => {
    let uploadedImages = []
    let config = {
        region: qiniu.region.z2,
      }
    for (let i = 0; i < this.state.selectedImages.length; i++) {
      // 对必要参数进行配置
      let file = this.state.selectedImages[i]
      let key = `jinapp/${file.name}`
      let token = this.state.uploadToken
      let putExtra = {
        fname: file.name,
        params: {},
        mimeType: ["image/png", "image/jpeg", "image/gif"] || null
      };
      let observable = qiniu.upload(file, key, token, putExtra, config)

      observable.subscribe({
        next: res => console.log(res),
        error: err => console.log(err),
        complete: res => {
          console.log(res)
          uploadedImages.push(`http://jinshang-test.chimukeji.com/${res.key}`)
        }
      })
    }
    this.setState({uploadedImages})
  }

  pickImage = (e) => {
    let files = e.target.files
    if(this.state.displayImages.length === 4 || files.length > 4) return Toast.show('最多上传4张图片')
    let displayImages = []
    let fileIndex = 0
    if(!files.length) return
    reader.readAsDataURL(files[fileIndex])
    reader.onloadend = () => {
      displayImages.push(reader.result)
      fileIndex++
      if (fileIndex < files.length) {
        reader.readAsDataURL(files[fileIndex])
      } else {
        console.log('全部终了')
        console.log(displayImages)
        this.setState({
          selectedImages: [...this.state.selectedImages, ...files],
          displayImages: [...this.state.displayImages, ...displayImages]
        })
      }
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
              <Flex className='imgUpload' wrap={true}>
                {this.renderDisplayImages()}
                <div className='icon'>
                  <label htmlFor="imgUploadBtn">
                    <FiUpload size={24} />
                  </label>
                  <input style={{display: 'none'}} id='imgUploadBtn' multiple type="file" accept='image/*' onChange={(e) => this.pickImage(e)} />
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
