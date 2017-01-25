class ClientController {
  constructor($state, $stateParams, Client, MacroPlan, AlertService) {
    this._$state = $state;
    this._Client = Client;
    this._MacroPlan = MacroPlan;
    this._AlertService = AlertService;

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
    if (this.params.plan_id) {
      this._MacroPlan.getByClient(this.params.id, this.params.plan_id)
        .then(res => {
          let macro_plan = res.macro_plan;
          const dd = macro_plan.start_date.split('-');
          macro_plan.start_date = new Date();
          macro_plan.start_date.setFullYear(parseInt(dd[0]));
          macro_plan.start_date.setMonth(parseInt(dd[1]) - 1);
          macro_plan.start_date.setDate(parseInt(dd[2]));

          this.macro_plan = macro_plan;
        });
    } else {
      this.macro_plan = null;
    }
  }

  onPlanUpdate($event) {
    console.log(">>>", $event);
    if ($event.id) {
      this._MacroPlan.updateByClient(this.params.id, $event.id, $event)
        .then(res => {
          if (res) {
            this._AlertService.success("Plan is updated!");
            this.params.plan_id = null;
            this.params.macro_plan = null;

            this.load();
          } else {
            this._AlertService.error("Error to update the plan");
          }
        });
    } else {
      this._MacroPlan.createByClient(this.params.id, $event)
        .then(res => {
          if (res) {
            this._AlertService.success("New plan is created!");
            this.params.plan_id = null;
            this.params.macro_plan = null;

            this.load();
          } else {
            this._AlertService.error("Error to save new plan");
          }
        });
    }
  }

  onPlanNew() {
    this.params.plan_id = null;
    this._$state.go('client', this.params);
  }
}

ClientController.$inject = ['$state', '$stateParams', 'Client', 'MacroPlan', 'AlertService'];

export default ClientController;
