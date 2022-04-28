import { ImageContainer } from '@components/ImageContainer';
import { Menu } from '@components/Menu';
import { Photo } from '@domain/Photo';
import { getListOfImages, queryPhotos } from '@services/ImageService';
import React, { useState } from 'react';
import { BsX } from 'react-icons/bs';
import * as Styled from './style';

// const ImageContainer = React.lazy(() => import('@components/ImageContainer'));


interface IIndexProps {

}
const useTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("timeline");

  return {
    activeTab,
    setActiveTab
  }
}

export const Index: React.FC<IIndexProps> = (props: IIndexProps) => {
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  const {
    activeTab,
    setActiveTab
  } = useTabs();


  React.useEffect(() => {
    const changes = {
      timeline: () => getListOfImages(),
      trashCan: () => queryPhotos([{
        fieldName: "delete",
        operator: "==",
        value: 1
      }])
      
    }
    changes[activeTab as keyof typeof changes]().then((d) => setPhotos(d.sort((a, b) => b.createdDate.valueOf() - a.createdDate.valueOf())))
  }, [activeTab])

  return <React.Suspense fallback={<div>Carregando...</div>}>
    <Styled.Container>
    <Styled.Header>
      <BsX />
    </Styled.Header>
    <Styled.Body>
      <Menu selectedTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ flexGrow: 1 }}> 
        <ImageContainer photos={photos} />
      </div>
    </Styled.Body>
    </Styled.Container>
  </React.Suspense>
}