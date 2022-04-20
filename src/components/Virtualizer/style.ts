import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  border: 2px dashed red; //DEBUG
  /* width: 100%; */
  /* height: 400px; */
  overflow-y: scroll;
  
`;

export const ListPositionContainer = styled.div<{
  $position?: number
}>`
  position: relative;
  border: 2px dashed red; //DEBUG
  /* width: 100%; */
  /* position: absolute;
  top: ${({ $position }) => $position}px; */
`;