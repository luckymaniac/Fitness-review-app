import angular from 'angular';
import uiRouter from 'angular-ui-router';
import TrackLogComponent from './track-log.component';

let TrackLogModule = angular.module('track-log', [])

.component('etpTrackLog', TrackLogComponent)
  
.name;

export default TrackLogModule;
