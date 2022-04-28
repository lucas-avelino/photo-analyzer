import { ImageContainer } from '@components/ImageContainer';
import { Photo } from '@domain/Photo';
import { getListOfImages } from '@services/ImageService';
import React, { useState } from 'react';
// const ImageContainer = React.lazy(() => import('@components/ImageContainer'));


interface IIndexProps {

}

export const Index: React.FC<IIndexProps> = (props: IIndexProps) => {
  const [photos, setPhotos] = useState<Array<Photo>>([]);

  React.useEffect(() => {
    getListOfImages()
      .then((d) => setPhotos(d.sort((a, b) => a.createdDate.valueOf() - b.createdDate.valueOf())))
  }, [])

  return <React.Suspense fallback={<div>Carregando...</div>}>
    <div style={{ height: 'calc(100vh - 50px)', width: 'calc(100vw - 50px)' }}>
      <ImageContainer photos={photos} />
    </div>
  </React.Suspense>
}