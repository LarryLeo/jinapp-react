import styled from 'styled-components'

export const HeaderTitleWrapper = styled.div`
  position: relative;
  background-color: #007aff;
  color: #fff;
  height: 44px;
  line-height: 44px;
  text-align: center;
  .backButton {
    display: ${props => props.isLevelOne ? 'none' : 'block'};
    position: absolute;
    left: 10px;
    top: 0;
  }
`
