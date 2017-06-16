import angular from 'angular';
import uiRouter from 'angular-ui-router';
import goalChangesComponent from './goal-changes.component';

let goalChangesModule = angular.module('goal_changes', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('goal_changes', {
      url: '/goal-changes',
      component: 'goalChanges',
      resolve: {
        auth: (Auth) => {
          return Auth.ensureAuth();
        }
      }
    });
})

.component('goalChanges', goalChangesComponent)
  
.name;

export default goalChangesModule;
