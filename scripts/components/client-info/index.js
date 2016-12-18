import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ClientInfoComponent from './client-info.component';

let ClientInfoModule = angular.module('client-info', [])

.component('etpClientInfo', ClientInfoComponent)
  
.name;

export default ClientInfoModule;
