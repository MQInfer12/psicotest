import CryptoJS from "crypto-js";

const decipher = (txt) => {
  txt = txt.replaceAll("_", "/");
  txt = CryptoJS.AES.decrypt(txt, "jose");
  let txtDescifrado = txt.toString(CryptoJS.enc.Utf8);
  return txtDescifrado;
};

export default decipher;
