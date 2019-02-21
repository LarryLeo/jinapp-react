import styled from 'styled-components'

export const BottomTabGroup = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fffafa;
  .tabWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 50px;
  }
  a {
    color: #000;
    &:hover {
      color: #000;
    }
  }
  .iconWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tabName {
    font-size: 12px;
    &.active {
      color: #007aff;
    }
  }
`
