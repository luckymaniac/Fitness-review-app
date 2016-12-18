import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import loginComponent from './login.component';

let loginModule = angular.module('login', [
  uiRouter, ngMaterial
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    });
})

.component('login', loginComponent)
  
.name;

export default loginModule;
