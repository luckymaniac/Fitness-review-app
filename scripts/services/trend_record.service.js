import API from './api.service.js';

class TrendRecord extends API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    super(AppConstants, $http, $httpParamSerializer);
  }

  toString() {
    return '/trend_records';
  }

  weight(client_id, start_date) {
    const url = `/clients/${client_id}${this.toString()}/weight`;
    const data = {start_date};

    return this._get(url, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }
}

TrendRecord.$inject = ['AppConstants', '$http', '$httpParamSerializer'];

export default TrendRecord;
