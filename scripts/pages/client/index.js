import angular from 'angular';
import uiRouter from 'angular-ui-router';
import clientComponent from './client.component';

let clientModule = angular.module('client', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('client', {
      url: '/clients/:id',
      component: 'client',
      params: {
        plan_id: null
      },
      resolve: {
        auth: (Auth) => {
          return Auth.ensureAuth();
        }
      }
    });
})

.component('client', clientComponent)
  
.name;

export default clientModule;
