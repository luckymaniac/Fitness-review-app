import angular from 'angular';
import uiRouter from 'angular-ui-router';
import WeightChartComponent from './weight-chart.component';

let WeightChartModule = angular.module('weight-chart', [])

.component('etpWeightChart', WeightChartComponent)
  
.name;

export default WeightChartModule;
