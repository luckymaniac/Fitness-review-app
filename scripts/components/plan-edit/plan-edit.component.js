import template from './plan-edit.html';
import controller from './plan-edit.controller';
import './plan-edit.scss';

let planEditComponent = {
  restrict: 'E',
  bindings: {
    client: '<',
    onUpdate: '&'
  },
  template,
  controller
};

export default planEditComponent;
