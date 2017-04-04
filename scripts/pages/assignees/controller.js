class AssigneesController {
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
    this.promise = this._Client.assignees(this.query);
    this.promise.then(res => {
      if (res) {
        this.total = res.total;
        this.clients = res.clients;
      }
    });
  }

  onSelect(item) {
    this._$state.go('message', {client_id: item.id});
  }

  //===== Table =====
  onPaginate(page, limit) {
    let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
    $ctrl.query.page = page;
    $ctrl.query.limit = limit;
    $ctrl.load();
  }

  onOrder(order) {
    let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
    $ctrl.query.sort = order;
    $ctrl.load();
  }
}

AssigneesController.$inject = ['$state', 'Client'];

export default AssigneesController;
