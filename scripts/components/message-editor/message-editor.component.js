import template from './message-editor.html';
import controller from './message-editor.controller';
import './message-editor.scss';

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
