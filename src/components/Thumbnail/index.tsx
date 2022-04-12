import { Photo } from '@domain/Photo';
import { getImage } from '@services/ImageService';
import React from 'react';
// import Styled from './style';

interface IThumbnailProps {
  photo: Photo;
}

export const Thumbnail: React.FC<IThumbnailProps> = React.memo((props) => {
  const [imgContent, setImgContent] = React.useState("");

  React.useEffect(() => {
    // getImage(props.photo.path).then(r => {
    //   setImgContent(r)
    // })
  }, [props.photo.path])

  const width = props.photo.width / (props.photo.height / 200);

  return <img height={"200px"} style={{ backgroundColor: "grey", width: width+"px" }} src={props.photo.thumbnail} />
})