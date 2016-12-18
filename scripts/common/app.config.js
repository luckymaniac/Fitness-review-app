import authInterceptor from './app.interceptor.js';

let appConfig = ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, AppConstants)=> {
  "ngInject";

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  // config.headers['Content-Type'] = 'application/json';

  // $httpProvider.defaults.useXDomain = true;
  // $httpProvider.defaults.withCredentials = true;
  // delete $httpProvider.defaults.headers.common["X-Requested-With"];
  // $httpProvider.defaults.headers.common["Accept"] = "application/json";
  // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  // Push our interceptor for auth
  $httpProvider.interceptors.push(authInterceptor);
  
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
};

appConfig.$inject = ['$httpProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', 'AppConstants'];

export default appConfig;
