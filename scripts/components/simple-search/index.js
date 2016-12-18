import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SimpleSearchComponent from './simple-search.component';

let SimpleSearchModule = angular.module('simple-search', [])

.component('etpSimpleSearch', SimpleSearchComponent)
  
.name;

export default SimpleSearchModule;
