import styled from 'styled-components'

export const MyCenter = styled.div`
  padding-top: 10px;
  height: 100%;
  .userInfoPanel {
    display: flex;
    padding: 20px 10px;
    background-color: #fff;
    margin-bottom: 10px;
    .avatar {
      margin-right: 15px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }
    .userName {
      margin-bottom: 10px;
      font-size: 16px;
    }
  }
  .button {
    margin-top: 30px;
    padding: 0 20px;
  }
  .am-list-item .am-list-line .am-list-content {
    padding: 15px 0;
  }
  .logout {
    display: ${props => props.isLogin ? 'block' : 'none'}
  }
  .login {
    display: ${props => props.isLogin ? 'none' : 'block'}
  }
`
