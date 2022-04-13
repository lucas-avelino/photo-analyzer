import React from 'react';
import * as Styled from './style';

interface IThumbnailContainerProps {
  title: string;
  children?: React.ReactNode;
}

export const ThumbnailContainer: React.FC<IThumbnailContainerProps> = (props) => {

  return <>
    <Styled.Title>{props.title}</Styled.Title>
    <Styled.Container>
      {props.children}
    </Styled.Container>
  </>
}