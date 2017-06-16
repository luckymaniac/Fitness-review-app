class LosersController {
  constructor($state, Client, Membership, Goal) {
    window._$ctrl = this;
    this._$state = $state;
    this._Client = Client;
    this._Membership = Membership;
    this._Goal = Goal;

    this.init();
  }

  init() {
    this.query = {
      page: 1,
      size: 10,
      sort: 'client_goals.updated_at',
      search: null,
      scope: 'goal_losers',
      membership: null
    };
    this.total = 0;

    this._Membership.list()
      .then(res => {
        if (res) {
          this.memberships = res.memberships;
        }
      });

    this._Goal.list()
      .then(res => {
        if (res) {
          this.goals = res.goals;
        }
      });

    this.load();
  }

  load() {
    this.promise = this._Client.list(this.query);
    this.promise.then(res => {
      if (res) {
        this.total = res.total;
        this.clients = res.clients;
      }
    });
  }

  //===== Show =====

  showDescription(client) {
    if (!this.goals) return;

    let desc = "";

    const goal = _.find(this.goals, {id: client.client_goal.goal_id}, {});
    desc += goal.description;

    if (goal.phases) {
      desc += " - Phase " + (client.client_goal.phase || 1);
    }

    if (client.client_goal.weight) {
      desc += ` (${client.client_goal.weight} lbs)`
    }

    return desc;
  } 

  //===== Table =====

  onPaginate(page, limit) {
    let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
    $ctrl.query.page = page;
    $ctrl.query.limit = limit;
    $ctrl.load();
  }

  // column order
  onOrder(order) {
    let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
    $ctrl.query.sort = order;
    $ctrl.load();
  }
}

LosersController.$inject = ['$state', 'Client', 'Membership', 'Goal'];

export default LosersController;
