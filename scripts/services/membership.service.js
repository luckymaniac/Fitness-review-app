import API from './api.service.js';

class Membership extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/memberships';
  }

  list() {
    const url = this.toString();

    return this._public_api(url)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }
}

Membership.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default Membership;
