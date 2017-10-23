class ReviewsController {
  constructor($httpParamSerializer, MacroReview, Auth, Goal) {
    window._$ctrl = this;
    this._$httpParamSerializer = $httpParamSerializer;
    this._MacroReview = MacroReview;
    this._Auth = Auth;
    this._Goal = Goal;

    this.init();
  }

  init() {
    this.query = {
      page: 1,
      size: 10,
      search: null,
      scope: null,
      goal_scope: null,
      auto_scope: null
    };

    this.nextReviewParams = {
      onlyGoalHitters: false
    };

    this.total = 0;

    this.goals = [];

    this.load();
  }

  load() {
    this.promise = this._MacroReview.list(this.query);
    this.promise.then(res => {
      if (res) {
        this.total = res.total;
        this.macro_reviews = res.macro_reviews;
      }
    });

    this._Goal.list()
      .then(res => {
        this.goals = res.goals;
      });
  }

  onSearch() {
    this.load();
  }

  //===== Table =====

  onPaginate(page, limit) {
    const self = window._$ctrl;;
    self.query.page = page;
    self.query.limit = limit;
    self.load();
  }

  onOrder(order) {
    const self = window._$ctrl; // TODO: get rid of this dirty hack
    self.query.sort = order;
    self.load();
  }

  isSuper() {
    return this._Auth.me.is_super;
  }

  showGoal(client) {
    let result = '';

    const goal_id = _.get(client, 'client_goal.goal_id', null);

    if (goal_id !== null) {
      const goal = _.find(this.goals, {id: goal_id});
      if (goal) {
        result = goal.description.toUpperCase();
        if (goal.phases) {
          const phase = _.get(client, 'client_goal.phase') || 1;
          result += ' - Phase ' + phase;
        }
      }
    }
    return result;
  }

  nextReview() {
    let options = {};

    const goal = _.find(this.goals, {id: parseInt(this.query.goal_scope)});
    if (goal) {
      options['goalType'] = goal.description;
    }

    if (this.nextReviewParams.onlyGoalHitters) {
      options['onlyGoalHitters'] = true;
    }

    const qs = this._$httpParamSerializer(options);
    return `https://reviews.eattoperform.com/reviews/next?${qs}`;
  }
}

ReviewsController.$inject = ['$httpParamSerializer', 'MacroReview', 'Auth', 'Goal'];

export default ReviewsController;
