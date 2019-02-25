import styled from 'styled-components'

export const MakeWrapper = styled.div`
  color: #808080;
  font-size: 16px;
  .historyJump {
    padding: 10px;
    span {
      font-size: 14px;
      color: #8f8f94;
    }
  }
  .picker {
    margin-bottom: 10px;
  }
  .pickerChildren {
    background-color: #fff;
    padding: 5px 15px;
    .inlineWrapper {
      display: flex;
      height: 45px;
      line-height: 45px;
      font-size: 16;
      .pickerKey {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pickerVal {
        text-align: right;
        color: #888;
      }
    }
  }
  .consultItemPicker {
    display: ${props => props.currentPage === 'consultation' ? 'block' : 'none'}
  }
  .subject {
    box-sizing: border-box;
    position: relative;
    background-color: #fff;
    padding: 20px 15px;
    margin-top: 10px;
    &::after {
      content: '';
      display: block;
      background-color: #d1d1d1;
      height: 1px;
      width: calc(100%  - 30px);
      position: absolute;
      bottom: 0;
      left: 15px;
    }
  }
  .key {
    margin-right: 30px;
  }
  .value {
    flex: 1;
    border: none;
    text-align: right;
  }
  .textArea {
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    border: none;
    padding: 15px;
  }
`
