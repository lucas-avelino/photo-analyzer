import styled from "styled-components";

export const Container = styled.div<{
  selected?: boolean,
  $width: number
}>`
  position: relative;
  background-color: #D8D0FF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: ${({ selected }) => selected ? "16" : "0"}px;
  width: ${({ $width }) => $width}px;
  box-sizing: border-box;
`;

export const SelectedLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 8px;
  font-size:1.5rem;
  cursor: pointer;
  background: linear-gradient(146deg, rgba(128,99,255,1) 0%, rgba(0,212,255,0) 29%);
`;

export const ExpandedImageModal = styled.div`
  position: fixed;
  background-color: black;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
`;