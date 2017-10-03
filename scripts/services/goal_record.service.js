import API from './api.service.js';

class GoalRecord extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/goal_records';
  }

  timeline(clientId) {
    return this._get(`/clients/${clientId}${this.toString()}/timeline`);
  }
}

GoalRecord.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default GoalRecord;
