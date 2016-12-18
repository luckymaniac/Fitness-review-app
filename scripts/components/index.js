import angular from 'angular';

import Logo from './logo';
import Navbar from './navbar';
import MainMenu from './main-menu';
import SimpleSearch from './simple-search';
import ReviewEdit from './review-edit';
import TrackLog from './track-log';
import ClientInfo from './client-info';
import PlanEdit from './plan-edit';

let componentModule = angular.module('app.components', [
  Logo,
  Navbar,
  MainMenu,
  SimpleSearch,
  ReviewEdit,
  TrackLog,
  ClientInfo,
  PlanEdit
])
  
.name;

export default componentModule;
