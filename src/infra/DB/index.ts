import Realm from "realm";

const Photos = {
  name: "Photos",
  properties: {
    path: "string",
    status: "string",
    createdDate: "date",
    thumbnail: "string", 
    height: "int",
    width: "int",
  }
}



export const RealmInstance = () =>  new Realm({ schema: [Photos] });;
