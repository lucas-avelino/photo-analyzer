import { Photo } from '@domain/Photo';
import { getImage } from '@services/ImageService';
import React from 'react';
import * as Styled from './style';

interface IThumbnailProps {
  photo: Photo;
}

export const Thumbnail: React.FC<IThumbnailProps> = React.memo((props) => {
  const [imgContent, setImgContent] = React.useState<string | undefined>();
  const [isImageOpen, setIsImageOpen] = React.useState(false);


  const width = props.photo.width / (props.photo.height / 200);

  const handleThumbClick = () => {
    setIsImageOpen(!isImageOpen);
    if (!imgContent)
      getImage(props.photo.path)
        .then(r => {
          setImgContent(r)
        })
  }

  return <a onClick={handleThumbClick}>
    <img height={"200px"} style={{ backgroundColor: "grey", width: width + "px" }} src={props.photo.thumbnail} />
    {isImageOpen &&
      <Styled.ExpandedImageModal>
        <img height={"100%"} style={{ maxHeight: "90vw", maxWidth: "90vw" }} src={imgContent || props.photo.thumbnail} />
      </Styled.ExpandedImageModal>
    }
  </a>
})