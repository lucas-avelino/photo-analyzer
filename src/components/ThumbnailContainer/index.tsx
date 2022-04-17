import { Thumbnail } from '@components/Thumbnail';
import { Photo } from '@domain/Photo';
import React from 'react';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import * as Styled from './style';

interface IThumbnailContainerProps {
  title: string;
  children?: React.ReactNode;
  onSelectedToggle?: (state: boolean) => void;
  photos: Array<Photo>;
}

export const ThumbnailContainer: React.FC<IThumbnailContainerProps> = (props) => {
  const [onMouseOver, setOnMouseOver] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<Array<string>>([]);

  const handleOnSelectedToggle = () => {
    if (selected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(props.photos.map(p => p.path))
    }
    setSelected(!selected);
    props.onSelectedToggle && props.onSelectedToggle(!selected);
  }

  const handleOnImageSelect = (photo: Photo) => {
    const isSelected = selectedItems.includes(photo.path);
    let newArray: Array<string> = [];
    if (isSelected) {
      newArray = selectedItems.filter(p => p !== photo.path);
    } else {
      newArray = [...selectedItems, photo.path];
    }
    setSelectedItems(newArray);
    if (newArray.length === props.photos.length) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }

  return <Styled.Container>
    <Styled.Header onClick={() => handleOnSelectedToggle()} onMouseOver={() => setOnMouseOver(true)} onMouseOut={() => setOnMouseOver(false)}>
      {(onMouseOver || selected) && (selected ? <BsCheckCircleFill fill={"#8063ff"} /> : <BsCheckCircle />)}
      <Styled.Title>{props.title}</Styled.Title>
    </Styled.Header>
    <Styled.Body>
      {props.photos.map((img: Photo) => <Thumbnail
        key={img.path}
        photo={img}
        selected={selectedItems.includes(img.path)}
        onSelect={handleOnImageSelect}
      />)}
    </Styled.Body>
  </Styled.Container>
}