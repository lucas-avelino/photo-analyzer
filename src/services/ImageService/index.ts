import { Photo } from "../../domain/Photo";
import { DBProcessSingleton } from "@services/DBProcess";
import { JsonSerializationReplacer } from "realm";
import * as FsType from "fs";
import { Config } from "@main/config";
import { DBCommands } from "@domain/commands";

var fs = window.require('fs') as typeof FsType;

type QueryOperator = '<' | '<=' | '==' | '!=' | '>' | '>=' | 'exists' | '!exists' | 'between' | '!between' | 'like' | '!like' | 'matches' | '!matches' | 'in' | '!in' | 'has' | '!has' | 'contains' | '!contains';

if (!fs.existsSync(Config.trashDir)) {
  console.log(`[Info]: trash can doesn't exists creating path`);
  fs.mkdirSync(Config.trashDir)
}

export const getImage = async (imageId: string) => {
  var fs = await window.require('fs') as typeof FsType;
  const file = fs.readFileSync(imageId);
  const base64 = "data:image/png;base64," + new Buffer(file).toString("base64")
  return base64;
}

export const getListOfImages = async (): Promise<Array<Photo>> => {
  const result = await DBProcessSingleton.sendMessageAsync(DBCommands.getPhotos);
  return JSON.parse(result).map((p: Photo) => ({ ...p, createdDate: new Date(p.createdDate) }));
}

export const queryPhotos = async (filter: Array<{ fieldName: string, operator: QueryOperator, value: any }>): Promise<Array<Photo>> => {
  const result = await DBProcessSingleton.sendMessageAsync(DBCommands.queryPhotos + "\n" + JSON.stringify(filter));
  return JSON.parse(result).map((p: Photo) => ({ ...p, createdDate: new Date(p.createdDate) }));
}

export const deleteImage = async (listOfPath: Array<string>) => {
  var fs = await window.require('fs') as typeof FsType;
  const result = await DBProcessSingleton.sendMessageAsync(DBCommands.softDeletePhotos + "\n" + JSON.stringify(listOfPath));
  listOfPath.forEach(path => {
    console.log(Config.trashDir, { path, fileName: path.substring(path.lastIndexOf('/') + 1) })
    fs.renameSync(path, Config.trashDir + path.substring(path.lastIndexOf('/') + 1))
  });

  return result;
}

export const getQuantityOfImages = async () => {
  return 0;
}

export const imageExists = async (path: string) => {
  return
}

