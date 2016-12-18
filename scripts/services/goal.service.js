import API from './api.service.js';

class Goal extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/goals';
  }
}

Goal.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default Goal;
