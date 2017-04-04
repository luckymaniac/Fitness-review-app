import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './assignees.component';

let module = angular.module('assignees', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('assignees', {
      url: '/assignees',
      component: 'assignees',
      resolve: {
        auth: (Auth) => {
          return Auth.ensureAuth();
        }
      }
    });
})

.component('assignees', component)
  
.name;

export default module;
