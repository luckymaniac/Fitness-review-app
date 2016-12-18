import template from './simple-search.html';
import controller from './simple-search.controller';
import './simple-search.scss';

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
