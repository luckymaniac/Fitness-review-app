import angular from 'angular';
import uiRouter from 'angular-ui-router';
import reviewsComponent from './reviews.component';

let reviewsModule = angular.module('reviews', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('reviews', {
      url: '/reviews',
      component: 'reviews',
      resolve: {
        auth: (Auth) => {
          return Auth.ensureAuth();
        }
      }
    });
})

.component('reviews', reviewsComponent)
  
.name;

export default reviewsModule;
