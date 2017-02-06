import API from './api.service.js';

class Note extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/notes';
  }
}

Note.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default Note;
