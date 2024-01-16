import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { app } from "./config";
import CryptoJS from "crypto-js";
import { gsap } from "gsap";
import toast from "react-hot-toast";
import { useLoadingStore } from "./store";

const toggleLoading = useLoadingStore.getState().toggleLoading;
const toggleLoadingUpload = useLoadingStore.getState().toggleLoadingUpload;

export const uploadFile = (roomId: string, file: any) =>
  new Promise((resolve, reject) => {
    const cryptedKey = CryptoJS.SHA512(roomId).toString(CryptoJS.enc.Hex);

    const storage = getStorage(app);
    const storageRef = ref(storage, cryptedKey + "/" + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.totalBytes > 204857600) {
          uploadTask.cancel();
          toggleLoading(false);
          toggleLoadingUpload(false);

          toast.error("File size exceeds 20mb limit!");
          return;
        }

        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        gsap.to(".loading-bar-width", {
          width: Math.max(progress, 30) + "%",
        });
      },
      (error) => {
        toggleLoading(false);
        toggleLoadingUpload(false);
        toast.error("Error while uploading file!");
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (e) => {
          toggleLoading(false);
          toggleLoadingUpload(false);
          resolve(e);
        });
      }
    );
  });
