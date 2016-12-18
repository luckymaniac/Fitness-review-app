import localStorage from 'localStorage';

let authInterceptor = function (AppConstants, $q) {

  return {
    // automatically attach Authorization header
    request: function(config) {
      if (config.url.indexOf(AppConstants.api) === 0) {
        config.headers['Content-Type'] = 'application/json';
        
        const token = localStorage.getItem(AppConstants.appKey);
        if (token) {
          config.headers.Authorization = 'Token token=' + token;
        }
      }

      return config;
    },

    // Handle 401
    responseError: function(rejection) {
      return $q.reject(rejection);
    }

  }
}

authInterceptor.$inject = ['AppConstants', '$q'];

export default authInterceptor;