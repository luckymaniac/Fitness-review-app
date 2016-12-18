import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainMenuComponent from './main-menu.component';

let mainMenuModule = angular.module('main-menu', [])

.component('etpMainMenu', mainMenuComponent)
  
.name;

export default mainMenuModule;
