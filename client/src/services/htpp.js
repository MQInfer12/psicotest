import { environment } from "../env";

export const cloudinaryHttp = "https://api.cloudinary.com/v1_1/dcy47gguk/";

const apis = {
  local: "http://127.0.0.1:8000/api/",
  production: "https://laravel-production-b355.up.railway.app/api/"
};

export const http = apis[environment];
