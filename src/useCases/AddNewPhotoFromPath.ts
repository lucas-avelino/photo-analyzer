import { createImage, imageExists } from "@services/ImageService";

var { create } = require('exif-parser');
var fs = window.require('fs');


export const addNewPhotoFromPath = (imageId: string) => {
  if(imageExists(imageId)){
    console.log("Already exists: ", imageId);
    return;
  }
  const file = fs.readFileSync(imageId);
  const stats = fs.statSync(imageId);
  const data = create(file).parse();

  createImage({
    path: imageId,
    createdDate: stats.mtime,
    status: "NOT_PROCESSED",
    ...data.imageSize
  })
}