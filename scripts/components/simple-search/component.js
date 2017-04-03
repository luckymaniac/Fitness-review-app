import template from './template.html';
import controller from './controller';
import './style.scss';

let simpleSearchComponent = {
  restrict: 'E',
  bindings: {
    ngModel: '=',
    onSearch: '&'
  },
  template,
  controller
};

export default simpleSearchComponent;
