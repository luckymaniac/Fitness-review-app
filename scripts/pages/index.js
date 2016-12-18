import angular from 'angular';
import Home from './home';
import Login from './login';
import Account from './account';
import Reviews from './reviews';
import Review from './review';
import Client from './client';

let pageModule = angular.module('app.pages', [
  Login,
  Home,
  Client,
  Account,
  Reviews,
  Review
])

.name;

export default pageModule;
