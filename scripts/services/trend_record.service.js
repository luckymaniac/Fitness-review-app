import API from './api.service.js';

class TrendRecord extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/trend_records';
  }
}

TrendRecord.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default TrendRecord;
