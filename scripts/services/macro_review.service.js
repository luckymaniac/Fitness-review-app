import API from './api.service.js';

class MacroReview extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/macro_reviews';
  }
}

MacroReview.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default MacroReview;
