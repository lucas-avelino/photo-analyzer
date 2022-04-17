import { Photo } from '@domain/Photo';
import { getImage } from '@services/ImageService';
import { BsCheckCircleFill } from 'react-icons/bs';
import React from 'react';
import * as Styled from './style';

interface IThumbnailProps {
  photo: Photo;
  selected?: boolean;
  onSelect?: (photo: Photo) => void
}

export const Thumbnail: React.FC<IThumbnailProps> = React.memo((props) => {
  const [imgContent, setImgContent] = React.useState<string | undefined>();
  const [isImageOpen, setIsImageOpen] = React.useState(false);

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
    <Styled.Container selected={props.selected} $width={expandedSize}>
      <img
        height={"100%"}
        src={props.photo.thumbnail}
      />
      {props.selected && <Styled.SelectedLayer>
        <BsCheckCircleFill
          fill={"#8063ff"}
          onClick={(e) => {
            e.stopPropagation();
            props.onSelect && props.onSelect(props.photo)
          }}
        />
      </Styled.SelectedLayer>}

    </Styled.Container>
    {isImageOpen &&
      <Styled.ExpandedImageModal>
        <img height={"100%"} style={{ maxHeight: "90vw", maxWidth: "90vw" }} src={imgContent || props.photo.thumbnail} />
      </Styled.ExpandedImageModal>
    }
  </a>
})