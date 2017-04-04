import template from './track-log.html';
import controller from './track-log.controller';
import './track-log.scss';

let component = {
  restrict: 'E',
  bindings: {
    client: '<'
  },
  template,
  controller
};

export default component;
