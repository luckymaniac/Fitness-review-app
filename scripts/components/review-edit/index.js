import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ReviewEditComponent from './review-edit.component';

let ReviewEditModule = angular.module('review-edit', [])

.component('etpReviewEdit', ReviewEditComponent)
  
.name;

export default ReviewEditModule;
