import angular from 'angular';
import uiRouter from 'angular-ui-router';
import logoComponent from './logo.component';

let logoModule = angular.module('logo', [
  uiRouter
])

.component('etpLogo', logoComponent)
  
.name;

export default logoModule;
