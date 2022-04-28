import styled, { css } from "styled-components";

export const Container = styled.div`
  /* border: 1px dashed blue; */
  width: 256px;
  height: 100%;
  /* padding: 4px; */
`;

export const Item = styled.li<{
  $selected: boolean;
}>`
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 1.20em;
  margin-right: 20px;
  padding: 4px 4px 4px 16px;
  border-radius: 0 25px 25px 0;
  font-weight: 600;
  ${({$selected}) => $selected 
    ? css`
      background-color: #e5dfff;
      &:hover{
        filter: brightness(0.90);
      }
    `
    :css`
      &:hover{
        background-color: #e5dfff;
      }
    `
  }
  span {
    margin-left: 16px;
  }

  color: #7359e5;
  cursor: pointer;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
