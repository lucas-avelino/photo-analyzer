import { imageExists } from "@services/ImageService";
const path = window.require('path');
const glob = window.require("glob");
const { spawn } = window.require('child_process');

const dir = "D:/Externo/Backups/";
const workers = 20;
const perWorker = 50;

export const sync = async () => {
  // spawn('node', [path.resolve("dist_scripts/scripts/RecognitionSystem/index.js")])
  glob(dir + '**/?(*.png|*.jpg|*.jpeg)', (err: any, re: string[]) => {
    if (re) {
      const toImport = re.filter(imageId => !imageExists(imageId));
      console.log(`Found ${re.length} files need to import ${toImport.length}`);
      const chunks = chunkfy(toImport, perWorker);
      const filePath = path.resolve("dist_scripts/scripts/SyncWorker/index.js");


      for (let i = 0; i < workers; i++) {
        const child = spawn('node', [filePath, JSON.stringify(chunks.pop())]);

        const onClose = (code: any) => {
          console.log(`child process<${i}> exited with code ${code}`);
          const chunk = chunks.pop();
          if(chunk){
            const newChild = spawn('node', [filePath, JSON.stringify(chunk)]);
            newChild.on('close', onClose);
          }
        }

        child.on('close', onClose);
      }
    }
  });
}

const chunkfy = (inputArray: Array<any>, perChunk: number) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray
  }, [])

}