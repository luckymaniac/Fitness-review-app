class HomeController {
  constructor($state, Client, Membership) {
    window._$ctrl = this;
    this._$state = $state;
    this._Client = Client;
    this._Membership = Membership;

    this.init();
  }

  init() {
    this.query = {
      page: 1,
      size: 10,
      sort: '-created_at',
      search: null,
      scope: 'just_signed_in',
      membership: null
    };
    this.total = 0;

    this._Membership.list()
      .then(res => {
        if (res) {
          console.log(res);
          this.memberships = res.memberships;
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

  onSearch() {
    this.load();
  }

  onScopeChange() {
    this.load();
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

HomeController.$inject = ['$state', 'Client', 'Membership'];

export default HomeController;
