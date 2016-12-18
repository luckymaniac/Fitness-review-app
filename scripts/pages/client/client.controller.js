class ClientController {
  constructor($stateParams, Client, MacroPlan) {
    this._Client = Client;
    this._MacroPlan = MacroPlan;

    this.init($stateParams);
  }

  init(params) {
    this.params = params;
    this.load();
  }

  load() {
    this.client = null;
    this._Client.get(this.params.id)
      .then(res => {
        this.client = res.client;
      });
  }

  onPlanUpdate($event) {
    this._MacroPlan.createByClient(this.params.id, $event)
      .then(res => {
        this.load();
      });
  }
}

ClientController.$inject = ['$stateParams', 'Client', 'MacroPlan'];

export default ClientController;
