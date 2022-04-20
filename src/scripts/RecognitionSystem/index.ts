import { getListOfImagesNotProcessed } from "../../services/ImageService"

const main = async () => {
  console.log(getListOfImagesNotProcessed())
}

main()