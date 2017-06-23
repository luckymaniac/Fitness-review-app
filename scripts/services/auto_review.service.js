import API from './api.service.js';

class AutoReview extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/auto_reviews';
  }

  list() {
    return this._public_api(this.toString())
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }
}

AutoReview.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default AutoReview;
