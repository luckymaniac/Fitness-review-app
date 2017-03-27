class ReviewsController {
  constructor(MacroReview, Auth, Goal) {
    window._$ctrl = this;
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
      scope: 'all',
      goal_scope: 'all',
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

    const goal_id = _.get(client, 'bio.goal_id', null);
    if (goal_id !== null) {
      const goal = _.find(this.goals, {id: goal_id});
      if (goal) {
        result = goal.description.toUpperCase();
        if (goal.phases) {
          const phase = _.get(client, 'bio.goal_phase') || 1;
          result += ' - Phase ' + phase;
        }
      }
    }
    return result;
  }
}

ReviewsController.$inject = ['MacroReview', 'Auth', 'Goal'];

export default ReviewsController;
