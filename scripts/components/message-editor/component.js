import template from './template.html';
import controller from './controller';
import './style.scss';

let component = {
  restrict: 'E',
  bindings: {
    client: '<',
    onUpdate: '&'
  },
  template,
  controller
};

export default component;
