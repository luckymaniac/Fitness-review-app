import template from './plan-edit.html';
import controller from './plan-edit.controller';
import './plan-edit.scss';

let planEditComponent = {
  restrict: 'E',
  bindings: {
    client: '<',
    plan: '<',
    onUpdate: '&',
    onNew: '&'
  },
  template,
  controller
};

export default planEditComponent;
