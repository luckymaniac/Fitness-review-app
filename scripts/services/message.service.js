import API from './api.service.js';

class Message extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/messages';
  }
}

Message.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default Message;
