import { Photo } from "../../../domain/Photo";
import { AceBase } from 'acebase';

type QueryOperator = '<' | '<=' | '==' | '!=' | '>' | '>=' | 'exists' | '!exists' | 'between' | '!between' | 'like' | '!like' | 'matches' | '!matches' | 'in' | '!in' | 'has' | '!has' | 'contains' | '!contains';

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
    const result = await db
      .query("Photos")
      .filter("delete", '==', undefined)
      .get();

    return result.getValues() as Array<Photo>;
  }

  queryListOfImages = async (filter: Array<{ fieldName: string, operator: QueryOperator, value: any }>) => {
    let partialQuery = db.query("Photos");
    filter.forEach((f) => {
      partialQuery = partialQuery.filter(f.fieldName, f.operator, f.value)
    });

    const result = await partialQuery.get();

    return result.getValues();
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
      .forEach((a) => {
        a.ref.update({
          delete: 1
        })
      })
  }
}