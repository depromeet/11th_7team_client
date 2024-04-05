import ky, { HTTPError } from "@toss/ky";
import {
  API_URL_DEVELOPMENT,
  API_URL_PRODUCTION,
  IS_PRODUCTION,
} from "@ygtang/constants";

import { ApiException } from "./exceptions/ApiException";
import { CustomException } from "./exceptions/CustomException";
import { errorMessage } from "./exceptions/messagePreset";

let instance = ky.create({
  prefixUrl: IS_PRODUCTION ? API_URL_PRODUCTION : API_URL_DEVELOPMENT,
  credentials: "include",
  timeout: 15000,
});

function setAccessToken(token: string) {
  console.log(token);
  instance = instance.extend({
    hooks: {
      beforeRequest: [
        async (request) => {
          request.headers.set("accessToken", `${token}`);
          return request;
        },
      ],
    },
  });
}

function interceptorError(error: HTTPError): never {
  if (error.response?.status) {
    const statusCode = error.response.status;

    if (
      error.response.headers.get("Content-Type")?.includes("application/json")
    ) {
      throw new ApiException({ message: error.message }, statusCode);
    } else if (statusCode === 408) {
      throw new CustomException(errorMessage.TIMEOUT, "NETWORK_TIMEOUT");
    }
  }

  throw error;
}

instance = instance.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        // You can modify the request headers here if needed
        return request;
      },
    ],
    beforeError: [interceptorError],
  },
});

async function get<T>(...args: Parameters<typeof instance.get>): Promise<T> {
  console.log("!!!");
  console.log(...args);
  const response = await instance.get(...args);
  console.log(response);
  return response.json();
}

async function post<T>(...args: Parameters<typeof instance.post>): Promise<T> {
  const response = await instance.post(...args);
  return response.json();
}

async function put<T>(...args: Parameters<typeof instance.put>): Promise<T> {
  const response = await instance.put(...args);
  return response.json();
}

async function patch<T>(
  ...args: Parameters<typeof instance.patch>
): Promise<T> {
  const response = await instance.patch(...args);
  return response.json();
}

async function del<T>(...args: Parameters<typeof instance.delete>): Promise<T> {
  const response = await instance.delete(...args);
  return response.json();
}

export { del, get, instance, patch, post, put, setAccessToken };
