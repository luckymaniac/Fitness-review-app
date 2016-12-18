import angular from 'angular';
import uiRouter from 'angular-ui-router';
import PlanEditComponent from './plan-edit.component';
import PlanNotesDialogController from './plan-notes-dialog.controller';

let PlanEditModule = angular.module('plan-edit', [])

.controller('PlanNotesDialogController', PlanNotesDialogController)

.component('etpPlanEdit', PlanEditComponent)
  
.name;

export default PlanEditModule;
