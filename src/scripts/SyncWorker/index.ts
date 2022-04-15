import { transformInPhoto } from '../../useCases/TransformInPhoto';
import { createImage } from '../../services/ImageService'

const myArgs = process.argv.slice(2);

const list = JSON.parse(myArgs[0]);

list.forEach(async (element: string) => {
  const r = await transformInPhoto(element);
  await createImage(r);
}); 