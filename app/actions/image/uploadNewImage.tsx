import { getStorage, ref, uploadBytes } from "firebase/storage";

export function uploadNewImage(file: File) {
  console.log({ file });

  const storage = getStorage();
  const storageRef = ref(storage, "image/teste.jpeg");

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!", { snapshot });
  });
}
