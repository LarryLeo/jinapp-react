import styled from 'styled-components'

export const MessageList = styled.div`
  /* 回复列表 */
  background-color: #f5f6fa;
  position: relative;
  .am-list-body {
    background-color: #f5f6fa;
  }
  .itemWrapper {
    padding: 0 10px;
    margin-bottom: 30px;
    .contentWrapper {
      padding: 10px;
      border-radius: 10px;
      background-color: #fff;
      max-width: 40%;
      line-height: 1.2rem;
    }
    .content-send {
      background-color: #007aff;
      color: #fff;
    }
  }
  .chatImage {
    width: 100px;
    height:100px;
    margin-top: 5px;
    margin-right:5px;
  }
  .avatar {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
  .am-list-body {
    border: none;
    padding-bottom: 60px;
    &::after {
      display: none;
    }
  }
`
export const ReplyBar = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  padding: 10px;
  box-shadow:0px -1px 2px 1px #bfb9b966;
  box-sizing: border-box;
  background-color: #eeeeee;
  align-items: center;
  .input {
    flex: 1;
    border: none;
    height: 30px;
    padding: 0 5px;
    margin: 0 10px;
  }
`
export const UploadImagePreview = styled.div`
  position: fixed;
  bottom: 55px;
  left: 0;
  display: flex;
  background-color: #f5f6fa75;
  padding: 5px;
  border-radius: 10px;
  .uploadImgWrapper {
    position: relative;
    padding:5px;
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
    }
    .close {
      position: absolute;
      right: -6px;
      top: -6px;
    }
  }
`
