import * as FsType from "fs";
let fs: typeof FsType = window.require("fs");
// if (!fs) {
//   fs = window.require("fs");
// }

const file = fs.readFileSync("./.conf");

interface IConfiguration {
  trashDir: string;
  discoveryDir: string;
  discoveryMaxWorkers: string;
  discoveryMaxImagesPerWorker: string;
}

export const Config: IConfiguration = Object.fromEntries(
  file
    .toString()
    .split("\n")
    .filter(l => !(l.startsWith("#") || l === "" || l === "\r"))
    .map(l => l.replace("\r", "").split("=", 2))
)

