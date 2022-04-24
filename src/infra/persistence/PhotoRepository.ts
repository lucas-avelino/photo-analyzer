import { Photo } from "@domain/Photo";
import { DBProcessSingleton } from "@services/DBProcess";

export class PhotoRepository {
  imageExists = async (path: Array<string>) => {

    // return DBProcessSingleton.sendMessageAsync();

  }

  getListOfImages = async () => {
    // return Object.values((await db.ref("Photos").get()).val()) as Array<Photo>;
  }

  getQuantityOfImages = async () => {
    // return db.ref("Photos").count();
  }

  createImage = async (image: Photo) => {
    // await db
    //   .ref("Photos")
    //   .push(image)
  }
}