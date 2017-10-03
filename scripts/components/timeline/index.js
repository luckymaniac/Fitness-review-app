import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './timeline.component';

let module = angular.module('timeline', [])

.component('etpTimeline', component)
  
.name;

export default module;
