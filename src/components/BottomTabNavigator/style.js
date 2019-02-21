import styled from 'styled-components'

export const BottomTabGroup = styled.div`
  display: ${props => props.isLevelOne ? 'block': 'none'};
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .tabWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
  }
  a {
    color: #33313b;
    &:hover {
      color: #33313b;
    }
  }
  .iconWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tabName {
    font-size: 12px;
  }
  .activeTab {
    color: #007aff;
    &:hover {
      color: #007aff;
    }
  }
`
