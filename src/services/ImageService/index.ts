import { Photo } from "../../domain/Photo";
import { RealmInstance } from "../../infra/DB";

export const getImage = async (imageId: string) => {
  var fs = await window.require('fs');
  const file = fs.readFileSync(imageId);
  const base64 = "data:image/png;base64," + new Buffer(file).toString("base64")
  return base64;
}

export const getListOfImages = () => {
  return RealmInstance().objects("Photos").sorted("createdDate").toJSON();
}

export const getQuantityOfImages = () => {
  return RealmInstance().objects("Photos").length;
}

export const imageExists = (path: string) => {
  return RealmInstance().objects("Photos").filtered("path = $0", path)[0];
}

export const createImage = (image: Photo) => {
  const realm = RealmInstance();

  realm.beginTransaction();

  realm.create("Photos", { ...image })

  realm.commitTransaction();

}
