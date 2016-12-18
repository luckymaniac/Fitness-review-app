import API from './api.service.js';

class Client extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/clients';
  }
}

Client.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default Client;
