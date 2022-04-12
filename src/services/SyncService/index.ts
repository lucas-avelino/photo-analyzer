import { createImage, imageExists } from "@services/ImageService";
import { addNewPhotoFromPath } from "@useCases/AddNewPhotoFromPath";
const path = window.require('path');
const fs = window.require('fs');
const glob = window.require("glob");
const { spawn } = window.require('child_process');

const dir = "D:/Externo/Backups/";
const workers = 10;
const perWorker = 100;

export const sync = async () => {

  glob(dir + '**/?(*.png|*.jpg|*.jpeg)', (err: any, re: string[]) => {
    if (re) {
      const toImport = re.filter(imageId => !imageExists(imageId));
      console.log(`Found ${re.length} files need to import ${toImport.length}`);
      const chunks = chunkfy(toImport, perWorker);
      const filePath = path.resolve("dist_scripts/scripts/SyncWorker/index.js");


      for (let i = 0; i < workers; i++) {
        const child = spawn('node', [filePath, JSON.stringify(chunks.pop())]);

        const processData = (data: string) => {
          console.log(data.toString().split("\n"))
          const objects = data.toString()
            .split("\n")
            .filter(line => line !== "")
            .map(line => JSON.parse(line.replace('\n', '')));
            
          objects.forEach(obj => createImage(obj))
          console.log(`stdout: ${objects}`);
        }

        const onClose = (code: any) => {
          console.log(`child process<${i}> exited with code ${code}`);
          const chunk = chunks.pop();
          if(chunk){
            const newChild = spawn('node', [filePath, JSON.stringify(chunk)]);
            newChild.on('close', onClose);
            newChild.stdout.on('data', processData);
          }
        }

        child.stdout.on('data', processData);
        child.on('close', onClose);
      }

      // chunks..forEach((chunk: Array<String>, i: number) => {
      //   // if(i > 1) return;
      //   const child = spawn('node', [path.resolve("dist_scripts/scripts/SyncWorker/index.js"), JSON.stringify(chunk)]);
      //   child.stdout.on('data', (data: string) => {
      //     console.log(data.toString().split("\n"))
      //     const objects = data.toString().split("\n").filter(line => line !== "").map(line => JSON.parse(line.replace('\n', '')));
      //     objects.forEach(obj => createImage(obj))
      //     console.log(`stdout: ${objects}`);
      //   });

      //   child.on('close', (code: any) => {
      //     console.log(`child process<${i}> exited with code ${code}`);
      //   });
      // });

      // for (int i =)
      // re.forEach((element: string) => {
      //   addNewPhotoFromPath(element)
      // });
      // worker.postMessage(re);
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