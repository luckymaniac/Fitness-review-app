import API from './api.service.js';

class Client extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/clients';
  }

  assignees(query) {
    const params = this.getQueryParams(query);

    return this._get(this.toString() + "/assignees", params)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }
}

Client.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default Client;
