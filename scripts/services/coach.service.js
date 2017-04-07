import API from './api.service.js';

class Coach extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/coaches';
  }

  supers() {
    return this._get(this.toString() + "/super")
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }
}

Coach.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default Coach;
