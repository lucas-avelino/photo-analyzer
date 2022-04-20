import React, { useEffect, useRef } from 'react';
import * as Styled from './style';

function checkVisible(elm: any) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

const makeList = (itens: number) => {
  var result = [];
  for (let i = 0; i < itens; i++) {
    result.push(<h1>{i}</h1>)
  }
  return result;
}


interface IVirtualizerProps {
  maxOfItemsPerScreen: number;
  width: number;
  height: number;
  heights?: Array<number>;
  list: Array<React.ReactElement>;

}

const borderItens = 1;

export const Virtualizer: React.FC<IVirtualizerProps> = ({
  maxOfItemsPerScreen,
  height,
  list,

  ...props
}: IVirtualizerProps) => {
  const containerRef = useRef<HTMLDivElement>();
  const [f, setF] = React.useState(0);

  const dict: { [k: number]: number } = React.useMemo(() => {
    let result = {};
    let sum = 0;
    for (let i = 0; i < props.heights.length; i++) {
      result = { ...result, [i]: sum };
      sum += props.heights[i]
    }
    return result;
  }, [props.heights]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const position = target.scrollTop;
    // setScrollPosition(position);
    if (dict[f] > position) {
      setF(Math.max(f - 1, 0));
    }
    else if (dict[f + 1] < position) {
      setF(Math.min(f + 1, props.heights.length));
    }
  };

  const pagedList = React.useMemo(() => {
    const result = list.filter((_, i) => i >= f && i < f + maxOfItemsPerScreen);
    return result;
  }, [f, borderItens, maxOfItemsPerScreen, list])

  const marginTop = (dict[f] || 0) + 'px';
  const marginBottom = (dict[props.heights.length - 1] - dict[f + maxOfItemsPerScreen] || 0) + 'px';


  return <Styled.Container style={{ width: `${props.width}px`, height: `${height}px` }} ref={containerRef} onScroll={handleScroll}>
    <Styled.ListPositionContainer
      style={{
        width: `${props.width}px`,
        marginTop,
        marginBottom
      }}
    >
      {pagedList}
    </Styled.ListPositionContainer>
  </Styled.Container>
}