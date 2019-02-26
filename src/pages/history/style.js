import styled from 'styled-components'

export const HistoryWrapper = styled.div`
  .am-tabs-default-bar-top .am-tabs-default-bar-tab {
    height: 50px;
    line-height: 50px;
  }
  .list {
    padding: 10px;
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
  .am-list-body {
    background-color: #f5f6fa;
  }
`
