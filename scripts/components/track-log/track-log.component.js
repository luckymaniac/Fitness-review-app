import template from './track-log.html';
import controller from './track-log.controller';
import './track-log.scss';

let trackLogComponent = {
  restrict: 'E',
  bindings: {
    client: '<'
  },
  template,
  controller
};

export default trackLogComponent;
