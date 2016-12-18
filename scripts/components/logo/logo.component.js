import template from './logo.html';
import controller from './logo.controller';
import './logo.scss';

let logoComponent = {
  restrict: 'E',
  bindings: {
    size: '<'
  },
  template,
  controller
};

export default logoComponent;
