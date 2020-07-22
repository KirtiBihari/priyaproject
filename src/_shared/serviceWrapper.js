import axios from 'axios';
import Api from './_constants';


export class API {
  constructor() {
    let service = axios.create({
      baseURL: Api.url,
      headers: {
        csrf: 'token'
      }
    });
    service.interceptors.request.use(
      function(config) {
        const token = localStorage.getItem('authorization1');
        if (token) {
          config.headers.authorization1 = localStorage.getItem(
            'authorization1'
          );
          // Authorization: `Bearer ${token}`,
        }
        return config;
      },

      function(error) {
        return Promise.reject(error);
      }
    );
    //  service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return error;
  }

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path) {
    return this.service.get(path);
  }

  patch(path, payload) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload
    });
  }

  put(path, payload) {
    return this.service.request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: payload
    });
  }

  post(path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    });
  }

  delete(path, payload) {
    return this.service.request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload
    });
  }
}

export default new API();
