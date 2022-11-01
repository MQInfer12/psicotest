import CryptoJS from "crypto-js";

const code = (text) => {
    var txtcifrado = CryptoJS.AES.encrypt(text, "jose").toString();
    return txtcifrado;
  };

export default code