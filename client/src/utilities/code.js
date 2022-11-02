import CryptoJS from "crypto-js";

const code = (text) => {
    let txtcifrado = CryptoJS.AES.encrypt(text, "jose").toString();
    txtcifrado.replaceAll("/", "_");
    return txtcifrado;
  };

export default code