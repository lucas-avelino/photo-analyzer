import process from 'process'
import { PhotoRepository } from './persistence/PhotoRepository'

process.send("Starting DB process")
const photoRepository = new PhotoRepository();

const sendResponseToCommand = (command: string, response: string) => {
  process.send(`${command}\n${response}`)
}

process.on("message", async (m: string) => {
  const [id, command, metadata] = m.split("\n");

  if (command === "/insert") {
    try {
      const commandObj = JSON.parse(metadata);
      await photoRepository.createImage(commandObj)
    } catch (error) {
      process.send("error: " + error)
    }
  } else if (command === "/exists") {
    try {
      const commandArray = JSON.parse(metadata);
      const imagesFound = (await photoRepository.imageExists(commandArray)) as unknown as Array<string>;
      const result = commandArray.filter((p: string) => !imagesFound.includes(p))
      sendResponseToCommand(id, JSON.stringify(result))
    } catch (error) {
      process.send("error: " + error)
    }
  } else if (command === "/getAll") {
    try {
      const result = await photoRepository.getListOfImages();
      sendResponseToCommand(id, JSON.stringify(result))
    } catch (error) {
      process.send("error: " + error)
    }
  }

});

setInterval(() => { }, 500);