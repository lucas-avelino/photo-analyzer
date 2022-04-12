import React from 'react';
import * as Styled from './style';

interface IThumbnailContainerProps{
  children?: React.ReactNode; 
}

export const ThumbnailContainer: React.FC<IThumbnailContainerProps> = (props) => {

  return <Styled.Container>
    {props.children}
  </Styled.Container>
}