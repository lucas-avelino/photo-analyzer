import { DBProcessSingleton } from "@services/DBProcess";
import * as ChildProcessType from "child_process";

const path = window.require('path');
const glob = window.require("glob");
const { spawn } = window.require('child_process') as typeof ChildProcessType;

const dir = "D:/Externo/Computador antigo/Documents/Pictures/";
const workers = 20;
const perWorker = 50;
const filePath = path.resolve("dist_scripts/scripts/SyncWorker/index.js");


export const sync = async () => {
  const spawnSyncer = (toProcess: any) => {
    return spawn('node', [filePath, JSON.stringify(toProcess)], { cwd: './', stdio: ['ipc'] })
  }

  glob(dir + '**/?(*.png|*.jpg|*.jpeg)', async (err: any, re: string[]) => {
    if (re) {
      const result = await DBProcessSingleton.sendMessageAsync("/exists\n"+JSON.stringify(re))
      const toImport: Array<string> = JSON.parse(result);
      console.log(`Found ${re.length} files need to import ${toImport.length}`);
      const chunks = chunkfy(toImport, perWorker);



      for (let i = 0; i < workers; i++) {
        const child = spawnSyncer(chunks.pop());

        const onMessage = (m: string) => {
          DBProcessSingleton.sendMessage(m.replace("/insert ", "/insert\n"));
        }

        const onClose = (code: any) => {
          console.log(`child process<${i}> exited with code ${code}`);
          const chunk = chunks.pop();
          if (chunk) {
            const newChild = spawnSyncer(chunks.pop());
            newChild.on('close', onClose);
            newChild.on('message', onMessage)
          }
        }

        child.on('close', onClose);
        child.on('message', onMessage)
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