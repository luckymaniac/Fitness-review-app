import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import mdDataTable from 'angular-material-data-table';
import 'angular-chart.js/dist/angular-chart';

import 'angular-material/angular-material.css';
import 'angular-material/layouts/angular-material.layout-attributes.css';
import 'angular-material/layouts/angular-material.layouts.css';
import 'angular-material-data-table/dist/md-data-table.css';

import appConstants from './common/app.constants.js'
import appMessages from './common/app.messages.js'
import appConfig from './common/app.config';

import AppComponent from './app.component';
import Services from './services';
import UI from './ui';
import Components from './components';
import Pages from './pages';

angular.module('app', [
    uiRouter,
    angularAnimate,
    angularMaterial,
    mdDataTable,
    'chart.js',
    Services,
    UI,
    Components,
    Pages
  ])
  
  .constant('AppConstants', appConstants)

  .constant('AppMessages', appMessages)

  .config(appConfig)

  .component('app', AppComponent);
