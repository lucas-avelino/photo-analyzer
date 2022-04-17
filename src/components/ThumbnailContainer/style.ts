import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-content: center;
  float: left;
  font-size:1.5rem;
  margin-bottom: 16px;
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  & > * {
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;

export const Title = styled.span`
  float: left;
  margin-left: 8px;
`;

