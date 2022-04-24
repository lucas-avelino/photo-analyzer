import React, { useContext } from "react"

interface ISelectedImagesContext {
  addImage: (p: string) => void;
  removeImage: (p: string) => void;
  value: Array<string>;
}

const SelectedImagesContext = React.createContext<ISelectedImagesContext>({
  value: [],
  addImage: () => { },
  removeImage: () => { },
});


export const useCreateSelectedImagesContext = () => {
  const [value, setValue] = React.useState<Array<string>>([]);

  const addImage = (p: string) => {
    console.log("ADD")
    setValue((v) => [...v, p]);
  }
  const removeImage = (p: string) => {
    setValue((v) => v.filter(path => path != p));
  }

  const C: React.FC<{ children: React.ReactNode }> = (props) => <SelectedImagesContext.Provider value={{ value, addImage, removeImage }} >{props.children}</SelectedImagesContext.Provider>

  const SelectedImagesContextProvider = React.useMemo(() => C, [value])

  return {
    SelectedImagesContextProvider
  }
}

export const useSelectedImagesContext = () => {
  const { value, addImage, removeImage } = useContext(SelectedImagesContext);

  const isSelected = (p: string) => {
    return value.includes(p);
  }

  return {
    addImage,
    removeImage,
    isSelected
  };
}