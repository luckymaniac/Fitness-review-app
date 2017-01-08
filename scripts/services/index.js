import angular from 'angular';

import AuthService from './auth.service';

import ClientService from './client.service';

import MacroReviewService from './macro_review.service';

import MacroPlanService from './macro_plan.service';

import TrendRecordService from './trend_record.service';

import GoalService from './goal.service';

import MacroGoalService from './macro_goal.service';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', [])

.service('Auth', AuthService)

.service('Client', ClientService)

.service('MacroReview', MacroReviewService)

.service('MacroPlan', MacroPlanService)

.service('MacroGoal', MacroGoalService)

.service('TrendRecord', TrendRecordService)

.service('Goal', GoalService)
  
.name;


export default servicesModule;
