import styled from 'styled-components'

export const HomePageWrapper = styled.div`
  background-color: #fff;
  height: 100%;
  padding: 5px 15px;
  a {
    color: #fff;
  }
  .slider {
    height: 150px;
    .control-dots .dot {
      box-shadow: none

    }
    .slideImg {
      width: 100%;
    }
  }
  /* 功能导航 */
  .menuGrid {
    margin: 15px 0;
  }
  .menuItem {
    margin-bottom: 10px;
    background-color: #389fff;
    border-radius: 8px;
    padding: 5;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    width: 48%;
    height: 78px;
    line-height: 78px;
  }
  .menuIcon {
    margin-right: 10px;
    width: 23px;
    height: 29px;
  }
  /* 咨询人数 */
  .consultInfo {
    padding: 20px;
    margin: 10px 0;
    background-color: #0093ff;
    border-radius: 8px;
    color: #fff;
    height: 100px;
  }
  /* 天气 */
  .weather {
    position: relative;
    height: 110px;
    overflow: hidden;
    border-radius: 8px;
    color: #fff;
  }
  .weatherBg {
    width: 100%;
  }
  .weatherText {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .temp {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`
