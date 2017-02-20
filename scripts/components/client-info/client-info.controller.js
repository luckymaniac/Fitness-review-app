class ClientInfoController {
  constructor(Goal, Client, AlertService) {
    this._Goal = Goal;
    this._Client = Client;
    this._AlertService = AlertService;
  }

  $onInit() {
    this.init();
  }

  $onChanges(changes) {
    this.init();
  }

  init() {
    this.isExpanded = true;

    const goal_id = _.get(this.client, 'bio.goal_id');
    this._Goal.list().then(res => {
      console.log(res);
      this.goals = res.goals;
      this.goal = _.find(this.goals, {id: goal_id});
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  editGoal(v = true) {
    this.isEditGoal = v;
  }

  update() {
    const data = {
      goal_id: this.goal.id
    };
    this._Client.update(this.client.id, data)
      .then(res => {
        if (res && res.success) {
          this.client = res.client;
          this._AlertService.success("Client's goal is updated!");
          this.editGoal(false);
        } else {
          this._AlertService.error("Failed to update Client's goal");
        }
      });
  }

  cancel() {
    const goal_id = _.get(this.client, 'bio.goal_id');
    this.goal = _.find(this.goals, {id: goal_id});
    this.editGoal(false);
  }
}

ClientInfoController.$inject = ['Goal', 'Client', 'AlertService'];

export default ClientInfoController;
