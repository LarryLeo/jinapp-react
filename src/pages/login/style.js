import styled from 'styled-components'

export const LoginForm = styled.div`
  padding: 20px;
  .raw {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
  }
  .key {
    width: 50px;
    color: #0093ff;
    font-weight: bold;
  }
  .input {
    flex: 1;
    border: none;
  }
  .vcode {
    background-color: ${props => props.isCounterRun ? '#888' : '#0093ff;'};
    color: #fff;
    height: 100%;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
  }
  .buttonArea {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }
`
