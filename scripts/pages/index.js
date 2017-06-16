import angular from 'angular';

import Home       from './home';
import Login      from './login';
import Account    from './account';
import Reviews    from './reviews';
import Client     from './client';
import Assignees  from './assignees';
import Message    from './message';
import Losers     from './losers';

let pageModule = angular.module('app.pages', [
  Login,
  Home,
  Client,
  Account,
  Reviews,
  Assignees,
  Message,
  Losers
])

.name;

export default pageModule;
