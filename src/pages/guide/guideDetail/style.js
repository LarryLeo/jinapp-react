import styled from 'styled-components'

export const DetailWrapper = styled.div`
  position: relative;
    .tabs-wrapper {
      padding: 0 20px;
      margin: 20px 0;
    }
    .tabs {
      height: 38px;
    }
    .material {
      display: ${props => props.activeTabIndex === 0 ? 'block' : 'none'};
    }
    .detail {
      display: ${props => props.activeTabIndex === 1 ? 'block' : 'none'};
      overflow: auto;
      padding: 0 15px;
      background-color: #fff;
      line-height: 1.5rem;
    }
`
