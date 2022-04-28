import * as ChildProcessType from "child_process";

const path = window.require('path');
const { spawn } = window.require('child_process') as typeof ChildProcessType;


class DBProcess {
  private databaseProcess;
  private messageCallbackDict: { [k: string]: (msg: string) => void } = {};

  constructor() {
    this.databaseProcess = spawn('node', [path.resolve("dist_scripts/scripts/DB/index.js"), ">", "dblog"], { cwd: './', stdio: ['ipc', 0, 1] });
    this.databaseProcess.on("message", (message: string) => {
      console.log("Message from DB ->>> " + message)
      if (message.includes("Message recived")) {
        return;
      }
      const [id, result] = message.split("\n");
      if (id && result && this.messageCallbackDict[id]) {
        // console.log(`--> Message is a command response`, this.messageCallbackDict)
        this.messageCallbackDict[id](result)
        this.messageCallbackDict[id] = undefined;
      }
    });
  }

  private processMessageFromDB = (string: string) => {

  }

  addMessageCallback(m: string, id: string, callback: (msg: string) => void) {
    this.messageCallbackDict[id] = callback;
  }

  removeMessageCallback(m: string) {
    this.messageCallbackDict[m] = undefined;
  }

  sendMessage(m: string) {
    const id = Date.now().toString();
    this.databaseProcess.send(`${id}\n${m}`);
  }

  sendMessageWithCallback(m: string, callback: (msg: string) => void) {
    const id = Date.now().toString();
    this.addMessageCallback(m, id, callback);
    this.databaseProcess.send(`${id}\n${m}`);
  }

  sendMessageAsync(m: string) {
    console.log("[sendMessageAsync]" + m)

    return new Promise<string>((resolve) => {
      this.sendMessageWithCallback(m, resolve)
    });
  }
}

export const DBProcessSingleton = new DBProcess();