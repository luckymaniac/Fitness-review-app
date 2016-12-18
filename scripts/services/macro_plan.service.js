import API from './api.service.js';

class MacroPlan extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/macro_plans';
  }
}

MacroPlan.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default MacroPlan;
