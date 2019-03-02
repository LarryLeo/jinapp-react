import styled from 'styled-components'

export const Communication = styled.div`
/* 自定义tab样式 */
  box-sizing: border-box;
  .am-tabs-default-bar-top .am-tabs-default-bar-tab {
    height: 50px;
    line-height: 50px;
  }
  .company {
    padding: 15px 0;
  }
  .pickerItem {
    padding: 25px 10px;
    margin-bottom: 15px;
    background-color: #fff;
    color: #888;
  }
  .textArea {
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    border: none;
    padding: 10px;
  }
  /* 上传图片 */
  .imgUpload {
    padding: 10px;
    box-sizing: border-box;
    flex-wrap: wrap;
    .icon {
      padding: 15px;
      border: 1px solid #d1d1d1;
    }
  }
  /* 上传图片区样式 */
  .displayImgWrapper {
    position: relative;
    margin-right: 12px;
    width: 58px;
    height: 58px;
    box-sizing: border-box;
    background-color: #fff;
    .displayImg {
      width: 100%;
      height: 100%;
    }
    .close {
      position: absolute;
      right: -8px;
      top: -8px;
    }
  }
  /* 提交 */
  .submit {
    margin-top: 30px;
  }
`
export const ChatList = styled.div`
  margin-top: 15px;
  color: #888;
  .chatListItem {
    padding: 15px 10px;
  }
  .memberAvatar {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
  }
  .time {
    margin-left: 10;
  }
  .messageContent {
    flex: 1;
    .userInfo {
      display: flex;
      align-items: baseline;
    }
    .companyName {
      margin-right: 5px;
      max-width: 150px;
      font-weight: bold;
      font-size: 16px;
      color: #000;
    }
    .memberName {
      font-size: 12px;
    }
    .lastMessage {
      margin-top: 15px;
    }
  }
`
