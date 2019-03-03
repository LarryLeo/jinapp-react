import styled from 'styled-components'

export const ContactList = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 10px 15px;
  .listItem {
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 15px;
    margin-bottom: 20px;
    background-color: #fff;
    font-size: 16px;
    /* box-shadow: 0 1px 4px 0px #0000006b; */
    .name {
      color: #0093ff;
      font-weight: bold;
    }
  }
`
