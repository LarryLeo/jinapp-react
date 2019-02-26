import styled from 'styled-components'

export const Wrapper = styled.div`
.am-list-body {
    background-color: #f5f6fa;
    border: none;
  }
  .listItem {
    padding: 10px;
    margin-bottom: 10px;
    height: 120px;
    background-color: #fff;
    .row {
      margin-bottom: 10px;
    }
    .header {
      margin-bottom: 15px;
      .unit {
        color: #0093ff;
        font-weight: bold;
      }
    }
    .status {
      display: inline-block;
      padding: 6px;
      border-radius: 12px;
      background-color: #0093ff;
      color: #fff;
      font-size: 10px;
    }
    .key {
      color: #888;
      margin-right: 10px;
    }
    .value {
      max-width: 250px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  /* 回复列表 */
  .itemWrapper {
    padding: 0 10px;
    margin-bottom: 30px;
    .content {
      padding: 10px;
      border-radius: 10px;
      background-color: #fff;
      max-width: 40%;
      line-height: 1.2rem;
    }
    .content-question {
      background-color: #007aff;
      color: #fff;
    }
  }

  .avatar {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
`
