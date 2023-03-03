const apis = {
  local: "http://127.0.0.1:8000/api/",
  production: "https://laravel-production-b355.up.railway.app/api/"
};

const firebaseConfigs = {
  local: {
    apiKey: "AIzaSyAxuerGxl8n432vRoieln-Sgb1c6jWMZHU",
    authDomain: "psicotest-local.firebaseapp.com",
    projectId: "psicotest-local",
    storageBucket: "psicotest-local.appspot.com",
    messagingSenderId: "44731850958",
    appId: "1:44731850958:web:1b840295faaf210e6c709f"
  }, 
  production: {
    apiKey: "AIzaSyDUaH7pSxqP3hX9vERC3mqRnm9cmaKgefc",
    authDomain: "psicotest-production.firebaseapp.com",
    projectId: "psicotest-production",
    storageBucket: "psicotest-production.appspot.com",
    messagingSenderId: "486755058036",
    appId: "1:486755058036:web:23189b74b20835f44e6c21"
  }
}

const environment = "local"; // 'local' o 'production'

export const firebaseEnvironment = firebaseConfigs[environment];
export const http = apis[environment];
export const cloudinaryEnvironment = "https://api.cloudinary.com/v1_1/dcy47gguk/";
export const githubAuthorization = "Bearer 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";