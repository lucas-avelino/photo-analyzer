import { Photo } from "../../../domain/Photo";
import { AceBase } from 'acebase';

export const db = new AceBase("mydb");

export class PhotoRepository {

  imageExists = async (path: Array<string>) => {

    return (
      await db
        .query("Photos")
        .filter("path", "in", path)
        .get()
    ).map(a => a.val().path);

  }

  getListOfImages = async () => {
    return Object.values((await db.ref("Photos").get()).val()) as Array<Photo>;
  }

  getQuantityOfImages = async () => {
    return db.ref("Photos").count();
  }

  createImage = async (image: Photo) => {
    await db
      .ref("Photos")
      .push(image)
  }

  removeImages = async (photosPaths: Array<string>) => {
    await db
      .query("Photos")
      .filter("path", "in", photosPaths)
      .remove()
  }
}