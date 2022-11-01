import CryptoJS from "crypto-js";

const decipher = (txt) => {
  var bytes = CryptoJS.AES.decrypt(txt, "jose");
  var txtDescifrado = bytes.toString(CryptoJS.enc.Utf8);
  return txtDescifrado;
};

export default decipher;
