import template from './timeline.html';
import controller from './timeline.controller';
import './timeline.scss';

let component = {
  restrict: 'E',
  bindings: {
    client: '<'
  },
  template,
  controller
};

export default component;
