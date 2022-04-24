import { transformInPhoto } from '../../useCases/TransformInPhoto';

const myArgs = process.argv.slice(2);

const list = JSON.parse(myArgs[0]);

list.forEach(async (element: string) => {
  const r = await transformInPhoto(element);
  process.send("/insert " + JSON.stringify(r))
}); 