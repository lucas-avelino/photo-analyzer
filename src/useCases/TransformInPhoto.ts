import sharp from 'sharp';

var { create } = require('exif-parser');
var fs = require('fs');


export const transformInPhoto = async (imageId: string) => {
  
  const [file, stats] = await Promise.all([fs.readFileSync(imageId), fs.statSync(imageId)]);
  const data = create(file).parse();
  const imageBuffer = await sharp(file)
    .resize({ height: 250 })
    .toBuffer();
  const base64 = "data:image/png;base64," + imageBuffer.toString("base64")

  return ({
    path: imageId,
    createdDate: stats.mtime,
    status: "NOT_PROCESSED",
    thumbnail: base64,
    ...data.imageSize
  })
}