import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountComponent from './account.component';

let accountModule = angular.module('account', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state('account', {
      url: '/account',
      component: 'account',
      title: 'Account',
      resolve: {
        auth: (Auth) => {
          return Auth.ensureAuth();
        }
      }
    });
})

.component('account', accountComponent)
  
.name;

export default accountModule;
