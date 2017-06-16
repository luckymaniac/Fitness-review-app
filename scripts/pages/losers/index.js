import angular from 'angular';
import uiRouter from 'angular-ui-router';
import losersComponent from './losers.component';

let losersModule = angular.module('losers', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('losers', {
      url: '/losers',
      component: 'losers',
      resolve: {
        auth: (Auth) => {
          return Auth.ensureAuth();
        }
      }
    });
})

.component('losers', losersComponent)
  
.name;

export default losersModule;
