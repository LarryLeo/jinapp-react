import styled, { keyframes  } from 'styled-components'
import { fadeIn } from 'react-animations'
const rateAni = keyframes`${fadeIn}`
export const Wrapper = styled.div`
.am-list-body {
    padding-bottom: 30px;
    padding-top: 10px;
    background-color: #f5f6fa;
    border: none;
  }
  .listItem {
    padding: 10px;
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
      max-width: 60%;
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
  /* 用户操作 */
  .userOperate {
    position: fixed;
    bottom: 0px;
    width: 100%;
    display:flex;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: #f5f6fa;
    padding: 5px 10px;
    .button {
      display: ${props => props.isFinished ? 'none' : 'block'};
      width: 40%;
      font-size: 14px;
    }
  }
`

export const RateModal = styled.div`
  /* 自定义modal样式 */
    display: ${props => props.visible ? 'block' : 'none'};
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    color: #888;
    background-color: rgba(0,0,0,0.4);
    z-index: 9;
    .rateWindow {
      animation: .5s ${rateAni};
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding-bottom:10px;
      width: 250px;
      border-radius: 10px;
      overflow: hidden;
    }
    .cover {
      height: 40%;
      width: 100%;
    }
    .title {
      font-size: 16px;
      margin: 10px;
    }
    .desc {
      margin-bottom: 5px;
      font-size: 12px;
    }
    .star {
      margin: 10px;
    }
`
