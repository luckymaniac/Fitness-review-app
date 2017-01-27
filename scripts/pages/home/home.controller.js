class HomeController {
  constructor($state, Client) {
    window._$ctrl = this;
    this._$state = $state;
    this._Client = Client;

    this.init();
  }

  init() {
    this.query = {
      page: 1,
      size: 10,
      sort: 'id',
      search: null,
      scope: 'all'
    };
    this.total = 0;

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

  onSelect(item) {
    this._$state.go('client', item);
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

HomeController.$inject = ['$state', 'Client'];

export default HomeController;
