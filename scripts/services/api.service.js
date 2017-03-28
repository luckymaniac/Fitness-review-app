class API {
  constructor(AppConstants, $http, $httpParamSerializer) {
    this.baseAPIURL = AppConstants.api;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$httpParamSerializer = $httpParamSerializer;
    this.cache = null;
  }

  toString() {
    return "";
  }

  buildURL(url=null) {
    let fullUrl = this._AppConstants.api;
    if (url) {
      fullUrl += url;
    }
    fullUrl += '.json';

    return fullUrl;
  }

  _api(options) {
    return this._$http(options)
      .then(res => {
        if (res.data.success) {
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res.data);
        };
      })
      .catch(err => {
        return Promise.reject(err.data);
      });
  }

  _post(url, data=null) {
    return this._api({
      url: this.buildURL(url),
      method: 'POST',
      data: data
    });
  }

  _put(url, data=null) {
    return this._api({
      url: this.buildURL(url),
      method: 'PUT',
      data: data
    });
  }

  _get(url=null, data=null) {
    let qs = data ? '?' + this._$httpParamSerializer(data) : '';

    return this._api({
      url: this.buildURL(url) + qs,
      method: 'GET'
    });
  }

  _delete(url=null, data=null) {
    let qs = data ? '?' + this._$httpParamSerializer(data) : '';

    return this._api({
      url: this.buildURL(url) + qs,
      method: 'DELETE'
    });
  }

  _public_api(url, data=null) {
    return this._api({
      url: this._AppConstants.public_api + url + '.json',
      method: 'GET',
      data: data
    });
  }

  list(query) {
    const params = this.getQueryParams(query);

    return this._get(this.toString(), params)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }

  get(id) {
    return this._get(this.toString() + '/' + id)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }

  update(id, object) {
    return this._put(this.toString() + '/' + id, object)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }

  listByClient(clientId, query) {
    return this._get(`/clients/${clientId}${this.toString()}`, query)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }

  getByClient(clientId, id) {
    return this._get(`/clients/${clientId}${this.toString()}/${id}`)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }

  createByClient(clientId, object) {
    return this._post(`/clients/${clientId}${this.toString()}`, object)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }

  updateByClient(clientId, id, object) {
    return this._put(`/clients/${clientId}${this.toString()}/${id}`, object)
      .then(res => {
        return res;
      })
      .catch(err => {
        return false;
      });
  }

  getQueryParams(query) {
    query = query || {};
    let params = _.clone(query);
    params.sort = null;

    if (query.sort) {
      if (query.sort[0] === '-') {
        params.order = query.sort.substring(1) + ' DESC';
      } else {
        params.order = query.sort + ' ASC';
      }
    }
    return params;
  }

}

export default API;
