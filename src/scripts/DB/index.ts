import process from 'process'
import { db, PhotoRepository } from './persistence/PhotoRepository'

export enum DBCommands {
  softDeletePhotos = '/softDeletePhotos',
  getPhotos = '/getPhotos',
  getDeletedPhotos = '/getDeletedPhotos',
  photosExists = '/photosExists',
  insertPhoto = '/insertPhoto'
}

process.send("Starting DB process")
const photoRepository = new PhotoRepository();

const sendResponseToCommand = (id: string, response: string) => {
  process.send(`${id}\n${response}`)
}

process.on("message", async (m: string) => {
  const [id, command, metadata] = m.split("\n");

  if (command === DBCommands.insertPhoto) {
    try {
      const commandObj = JSON.parse(metadata);
      await photoRepository.createImage(commandObj)
    } catch (error) {
      process.send("error: " + error)
    }
  } else if (command === DBCommands.photosExists) {
    try {
      const commandArray = JSON.parse(metadata);
      const imagesFound = (await photoRepository.imageExists(commandArray)) as unknown as Array<string>;
      const result = commandArray.filter((p: string) => !imagesFound.includes(p))
      sendResponseToCommand(id, JSON.stringify(result))
    } catch (error) {
      process.send("error: " + error)
    }
  } else if (command === DBCommands.getPhotos) {
    try {
      const result = await photoRepository.getListOfImages();
      sendResponseToCommand(id, JSON.stringify(result))
    } catch (error) {
      process.send("error: " + error)
    }
  } else if (command === DBCommands.softDeletePhotos) {
    try {
      await photoRepository.removeImages(JSON.parse(metadata));
      sendResponseToCommand(id, "done")
    } catch (error) {
      process.send("error: " + error)

    }
  }

});

setInterval(() => { }, 500);