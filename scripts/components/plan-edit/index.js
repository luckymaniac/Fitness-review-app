import angular from 'angular';
import uiRouter from 'angular-ui-router';
import PlanEditComponent from './plan-edit.component';

let PlanEditModule = angular.module('plan-edit', [])

.component('etpPlanEdit', PlanEditComponent)
  
.name;

export default PlanEditModule;
