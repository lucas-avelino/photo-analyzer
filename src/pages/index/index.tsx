import { Thumbnail } from '@components/Thumbnail';
import { ThumbnailContainer } from '@components/ThumbnailContainer';
import { Photo } from '@domain/Photo';
import { getListOfImages, getQuantityOfImages } from '@services/ImageService';
import { addNewPhotoFromPath } from '@useCases/AddNewPhotoFromPath';
import React, { useState } from 'react';
// import Styled from './style';

interface IIndexProps {

}

var groupBy = function (xs: Array<any>, key: any) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const Index: React.FC<IIndexProps> = (props: IIndexProps) => {
  const [value, setValue] = React.useState("");
  const [cache, setCache] = useState(false);
  const [page, setPage] = useState(1);

  const photosGroups = React.useMemo(() =>
    Object.entries(groupBy(
      getListOfImages()
        .filter((_, i) => i > 100 * (page - 1) && i < 100 * page)
        .map(obj => ({ ...obj, dtGroup: obj.createdDate.toISOString().split("T")[0] })),
      "dtGroup"
    ))
    , [cache, page]);

  const handleAdd = () => {
    setCache(!cache);
    addNewPhotoFromPath(value)
  }

  console.log(photosGroups)

  return <>
    <span>{getQuantityOfImages()}</span>
    <input value={value} onChange={(e) => setValue(e?.target?.value)} />
    <button onClick={handleAdd}>Add</button>
    <button onClick={() => setPage(page - 1)}>Prev Page</button>
    <button onClick={() => setPage(page + 1)}>Next Page</button>

    {photosGroups.map(([dtGroup, images]: [string, Array<Photo>]) =>
      <ThumbnailContainer>
        {images.map((img: Photo, i: number) => <Thumbnail key={img.path} photo={img} />)}
      </ThumbnailContainer>
    )}
  </>
}