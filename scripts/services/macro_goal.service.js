import API from './api.service.js';

class MacroGoal extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/macro_goals';
  }
}

MacroGoal.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default MacroGoal;
