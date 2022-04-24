import { Photo } from '@domain/Photo';
import React from 'react';
import * as Styled from './style';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';

interface ISelectionDivProps {
  selected: boolean;
  onSelect?: () => void;
  isOnHover: boolean;
}

export const SelectionDiv: React.FC<ISelectionDivProps> = (props: ISelectionDivProps) => {

  return props.selected
    ? <Styled.SelectedLayer>
      <BsCheckCircleFill
        fill={"#332766"}
        onClick={(e) => {
          e.stopPropagation();
          props.onSelect && props.onSelect()
        }}
      />
    </Styled.SelectedLayer>
    : props.isOnHover && <Styled.SelectedLayer>
      <BsCheckCircle
        fill={"#fff"}
        onClick={(e) => {
          e.stopPropagation();
          props.onSelect && props.onSelect()
        }}
      />
    </Styled.SelectedLayer>
}