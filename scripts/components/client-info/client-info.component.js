import template from './client-info.html';
import controller from './client-info.controller';
import './client-info.scss';

let clientInfoComponent = {
  restrict: 'E',
  bindings: {
    client: '<',
    onUpdate: '&',
    onUpdateCoach: '&'
  },
  template,
  controller
};

export default clientInfoComponent;
