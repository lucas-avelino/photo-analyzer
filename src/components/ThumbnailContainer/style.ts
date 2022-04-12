import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  & > * {
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;