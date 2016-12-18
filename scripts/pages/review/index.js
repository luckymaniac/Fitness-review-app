import angular from 'angular';
import uiRouter from 'angular-ui-router';
import reviewComponent from './review.component';

let reviewModule = angular.module('review', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('review', {
      url: '/reviews/:id',
      component: 'review',
      resolve: {
        auth: (Auth) => {
          return Auth.ensureAuth();
        }
      }
    });
})

.component('review', reviewComponent)
  
.name;

export default reviewModule;
