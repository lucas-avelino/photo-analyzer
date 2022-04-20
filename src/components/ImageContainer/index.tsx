import { Thumbnail } from '@components/Thumbnail';
import { ThumbnailContainer } from '@components/ThumbnailContainer';
import { Virtualizer } from '@components/Virtualizer';
import { Photo } from '@domain/Photo';
import React, { EventHandler, ReactNode } from 'react';
import { groupBy } from '../../utils/Array';
// import Styled from './style';

interface IImageContainerProps {
  photos: Array<Photo>;
}

const useDimensions = () => {
  const ref = React.useRef<HTMLDivElement>(undefined);
  const [dimensions, setDimensions] = React.useState([]);

  React.useEffect(() => {
    console.log("useEffect")
    function func(e: any) {
      console.log("resize", ref)
      setDimensions([ref.current.offsetWidth, ref.current.offsetHeight])
    }
    if (ref) {
      window.addEventListener("resize", func);
    }

    return () => {
      if (ref) {
        window.removeEventListener("resize", func)
      }
    }
  }, [ref])


  return {
    ref,
    dimensions
  }
}


export const ImageContainer = React.memo(({ photos, ...props }: IImageContainerProps) => {
  const {
    ref: container,
    dimensions
  } = useDimensions();

  const quantityOfPhotos = React.useMemo(() => photos.length, [photos]);
  const width = 1500;

  const photosGroups = React.useMemo(() =>
    Object.entries(groupBy(
      photos
        .map(obj => ({ ...obj, dtGroup: obj.createdDate.toISOString().split("T")[0] })),
      "dtGroup"
    ))
    // .filter((d, i) => i < 5)
    , [quantityOfPhotos]);

  // console.log(photosRendered);
  const groupHeights = React.useMemo(() => {
    return photosGroups.map(([_, photos]: [string, Array<Photo>]) => {
      let wTotal = 0;
      let lines = 1;

      photos.forEach(p => {
        const w = ((p.width / p.height) * 200) + 4;
        wTotal += w;
        if (wTotal > (dimensions[0] || width)) {
          wTotal = w;
          lines++;
        }
      });

      return (lines * 204) + 27 + 16;
    })
  }, [quantityOfPhotos, dimensions]);

  const photosRendered = React.useMemo(() => photosGroups.map(([dtGroup, photos]: [string, Array<Photo>]) =>
    <ThumbnailContainer key={dtGroup} title={dtGroup} photos={photos} />
  ), [quantityOfPhotos]);

  const memoVirtualizer = React.useMemo(() => quantityOfPhotos &&
    <Virtualizer
      width={dimensions[0] || width}
      height={(dimensions[1] || 100)}
      heights={groupHeights}
      list={photosRendered}
      maxOfItemsPerScreen={10}
    />, [dimensions, groupHeights, quantityOfPhotos])

  return <div style={{ width: "100%", height: "100%" }} ref={container}>
    <span>{quantityOfPhotos}</span>
    {quantityOfPhotos && memoVirtualizer}
  </div>
});