import template from './review-edit.html';
import controller from './review-edit.controller';
import './review-edit.scss';

let reviewEditComponent = {
  restrict: 'E',
  bindings: {
    macroReview: '<',
    onUpdate: '&'
  },
  template,
  controller
};

export default reviewEditComponent;
