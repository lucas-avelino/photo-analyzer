import React from 'react';
import { BsClock, BsTrash } from 'react-icons/bs';
import * as Styled from './style';

interface IMenuProps {
  selectedTab: string;
  setActiveTab: (tab: string) => void;
}

//https://www.color-hex.com/color/8063ff

export const Menu: React.FC<IMenuProps> = ({ selectedTab, setActiveTab, ...props }: IMenuProps) => {
  // 256

  return <Styled.Container>
    <ul>
      <Styled.Item onClick={() => setActiveTab('timeline')} $selected={selectedTab === 'timeline'}>
        <BsClock /> <span>Timeline</span>
      </Styled.Item>
      <Styled.Item onClick={() => setActiveTab('trashCan')} $selected={selectedTab === 'trashCan'}>
        <BsTrash /> <span>Lixeira</span>
      </Styled.Item>
    </ul>
  </Styled.Container>
}