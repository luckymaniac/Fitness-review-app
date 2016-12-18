import API from './api.service.js';
import localStorage from 'localStorage';

class Auth extends API {
  constructor(AppConstants, $http, $httpParamSerializer, $state) {
    super(AppConstants, $http, $httpParamSerializer);
    this._$state = $state;
  }

  login(user) {
    return this._post('/auth/login', user)
      .then(result => {
        const token = _.get(result, 'coach.token', null);
        this.setToken(token);

        return true;
      })
      .catch(err => {
        return false;
      });
  }

  logout() {
    return this._delete('/auth/logout')
      .then(result => {
        this.clearToken();
        this.me = null;
        return true;
      })
      .catch(err => {
        return false;
      });
  }

  setToken(token = null) {
    localStorage.setItem(this._AppConstants.appKey, token)
  }

  clearToken() {
    this.setToken(null);
  }


  getProfile() {
    return this._get('/profile')
      .then(res => {
        this.me = res.coach;
        return true;
      })
      .catch(err => {
        return Promise.reject(err);
      })
  }

  updateProfile(profile) {
    return this._put('/profile', profile)
      .then(res => {
        this.me = res.coach;
        return res;
      })
      .catch(err => {
        return err;
      });
  }

  updatePassword(password) {
    return this._put('/profile/password', password)
      .then(res => {
        return true;
      })
      .catch(err => {
        return false;
      });
  }

  ensureAuth() {
    const self = this;

    return new Promise((resolve, reject) => {
      if ( self.me ) {
        return resolve(self.me);
      } else {
        // self._$state.go('login');
        this.getProfile()
          .then(res => {
            return resolve(this.me);
          })
          .catch(err => {
            self._$state.go('login');
          });
      }
    });
  }

}

Auth.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$state'];

export default Auth;
