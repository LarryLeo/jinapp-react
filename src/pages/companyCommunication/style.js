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
    .icon {
      padding: 15px;
      border: 1px solid #d1d1d1;
    }
  }
  /* 提交 */
  .submit {
    margin-top: 30px;
  }
`
