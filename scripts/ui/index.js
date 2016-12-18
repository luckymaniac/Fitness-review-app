import angular from 'angular';

import AlertService from './alert.service/alert.service';

import ProcessingDialogDirective from './processing-dialog/processing-dialog.directive';
import CompareToDirective from './compare-to/compare-to.directive';
import PressEnterDirective from './press-enter/press-enter.directive';

import simpleDateFitler from './simpleDate.filter/simpleDate.filter';
import formatMinutesFilter from './formatMinutes.filter/formatMinutes.filter';
import formatInchFilter from './formatInch.filter/formatInch.filter';

let uiModule = angular.module('app.ui', [
])

.service('AlertService', AlertService)

.directive('processingDialog', ProcessingDialogDirective)
.directive('compareTo', CompareToDirective)
.directive('pressEnter', PressEnterDirective)

.filter('simpleDate', simpleDateFitler)
.filter('formatMinutes', formatMinutesFilter)
.filter('formatInch', formatInchFilter)

.name;

export default uiModule;
