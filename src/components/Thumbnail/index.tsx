import { Photo } from '@domain/Photo';
import { getImage } from '@services/ImageService';

import React from 'react';
import * as Styled from './style';
import { SelectionDiv } from './SelectionDiv';

interface IThumbnailProps {
  photo: Photo;
  selected?: boolean;
  onSelect?: (photo: Photo) => void
}

export const Thumbnail: React.FC<IThumbnailProps> = React.memo((props) => {

  const [imgContent, setImgContent] = React.useState<string | undefined>();
  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const expandedSize = props.photo.width / (props.photo.height / 200)

  const width = props.photo.width / (props.photo.height / (props.selected ? 180 : 200));

  const handleThumbClick = (e: any) => {

    setIsImageOpen(!isImageOpen);
    if (!imgContent)
      getImage(props.photo.path)
        .then(r => {
          setImgContent(r)
        })
  }

  return <a onClick={handleThumbClick}>
    <Styled.Container
      selected={props.selected}
      $width={expandedSize}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <img
        height={"100%"}
        src={props.photo.thumbnail}
      />
      <SelectionDiv
        isOnHover={isMouseOver}
        selected={props.selected}
        onSelect={()=> props.onSelect(props.photo)}
      />

    </Styled.Container>
    {isImageOpen &&
      <Styled.ExpandedImageModal>
        <img height={"100%"} style={{ maxHeight: "90vw", maxWidth: "90vw" }} src={imgContent || props.photo.thumbnail} />
      </Styled.ExpandedImageModal>
    }
  </a>
})