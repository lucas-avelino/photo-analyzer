import face_recognition
from PIL import Image
import uuid
import os
import sys
import json


listOfFiles = ""
if "-file=" in sys.argv[1]:
    f = open(sys.argv[1].replace("-file=", ""), "r+")
    listOfFiles = "".join([l.replace("\n", "") for l in f.readlines()])
    
if "-content=" in sys.argv[1]:
    listOfFiles = sys.argv[1].replace("-content=", "")

files = json.loads(listOfFiles)


dir = "D:/Externo/Photos/"
knowDir = "./data/know"
toProcessFacesDir = "./data/toProcessFaces/"

for filename in files:
    imagePath = filename
    unknown_image = face_recognition.load_image_file(imagePath)
    face_locations = face_recognition.face_locations(unknown_image)
    for face_location in face_locations:
        top, right, bottom, left = face_location
        face_image = unknown_image[(top):(bottom), (left):(right)]
        pil_image = Image.fromarray(face_image)
        imageName = uuid.uuid4()
        pil_image.save(toProcessFacesDir+str(imageName)+".jpg")
        pil_image.close()

    know = [os.path.join(knowDir, file) for file in os.listdir(knowDir)]

    for toProcessFacesDirfilename in os.listdir(toProcessFacesDir):
        knowFaces = [face_recognition.face_encodings(
            face_recognition.load_image_file(file))[0] for file in know]
        path_processing = toProcessFacesDir + toProcessFacesDirfilename

        try:
            unknown_face_encoding = face_recognition.face_encodings(
                face_recognition.load_image_file(path_processing))[0]

            results = face_recognition.compare_faces(
                knowFaces, unknown_face_encoding, 0.6)
        except:
            os.remove(path_processing)
            continue

        if(not any(results)):
            os.rename(path_processing, os.path.join(
                knowDir, toProcessFacesDirfilename))
        else:
            for i in range(len(results)):
                if(results[i]):
                    print(imagePath+" -> " +
                          know[i].replace(".jpg", "").replace(knowDir+"\\", ""))

            os.remove(path_processing)
