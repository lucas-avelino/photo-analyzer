import { Photo } from "../../domain/Photo";
import { DBProcessSingleton } from "@services/DBProcess";

export const getImage = async (imageId: string) => {
  var fs = await window.require('fs');
  const file = fs.readFileSync(imageId);
  const base64 = "data:image/png;base64," + new Buffer(file).toString("base64")
  return base64;
}

export const getListOfImages = async (): Promise<Array<Photo>> => {
  const result = await DBProcessSingleton.sendMessageAsync("/getAll");
  return JSON.parse(result).map((p: Photo) => ({ ...p, createdDate: new Date(p.createdDate) }));
}

export const getQuantityOfImages = async () => {
  return 0;
}

export const imageExists = async (path: string) => {
  return false
}

