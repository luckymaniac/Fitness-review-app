import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './component';

let module = angular.module('message', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('message', {
      url: '/clients/:client_id/message',
      component: 'message',
      resolve: {
        auth: (Auth) => {
          return Auth.ensureAuth();
        }
      }
    });
})

.component('message', component)
  
.name;

export default module;
