import angular from 'angular';

import Logo from './logo';
import Navbar from './navbar';
import MainMenu from './main-menu';
import SimpleSearch from './simple-search';
import TrackLog from './track-log';
import ClientInfo from './client-info';
import PlanEdit from './plan-edit';
import MessageEditor from './message-editor';

let componentModule = angular.module('app.components', [
  Logo,
  Navbar,
  MainMenu,
  SimpleSearch,
  TrackLog,
  ClientInfo,
  PlanEdit,
  MessageEditor
])
  
.name;

export default componentModule;
