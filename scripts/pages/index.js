import angular from 'angular';

import Home       from './home';
import Login      from './login';
import Account    from './account';
import Reviews    from './reviews';
import Review     from './review';
import Client     from './client';
import Assignees  from './assignees';
import Message    from './message';

let pageModule = angular.module('app.pages', [
  Login,
  Home,
  Client,
  Account,
  Reviews,
  Review,
  Assignees,
  Message
])

.name;

export default pageModule;
