import angular from 'angular';

import AuthService from './auth.service';

import ClientService from './client.service';

import MacroReviewService from './macro_review.service';

import MacroPlanService from './macro_plan.service';

import TrendRecordService from './trend_record.service';

import NoteService from './note.service';

import GoalService from './goal.service';

import MacroGoalService from './macro_goal.service';

import GoalRecordService from './goal_record.service';

import MessageService from './message.service';

import CoachService from './coach.service';

import MembershipService from './membership.service';

import AutoReviewService from './auto_review.service';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', [])

.service('Auth', AuthService)

.service('Client', ClientService)

.service('MacroReview', MacroReviewService)

.service('MacroPlan', MacroPlanService)

.service('MacroGoal', MacroGoalService)

.service('TrendRecord', TrendRecordService)

.service('Note', NoteService)

.service('Goal', GoalService)

.service('GoalRecord', GoalRecordService)

.service('Message', MessageService)

.service('Coach', CoachService)

.service('Membership', MembershipService)

.service('AutoReview', AutoReviewService)
  
.name;


export default servicesModule;
