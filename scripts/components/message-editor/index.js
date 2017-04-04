import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './message-editor.component';

let module = angular.module('message-editor', [])

.component('etpMessageEditor', component)
  
.name;

export default module;
