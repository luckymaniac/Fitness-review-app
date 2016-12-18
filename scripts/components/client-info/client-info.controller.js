class ClientInfoController {
  constructor(Goal) {
    this._Goal = Goal;
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
    if (goal_id) {
      this._Goal.get(goal_id).then(res => {
        this.goal = res.goal;
      });
    }
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

ClientInfoController.$inject = ['Goal'];

export default ClientInfoController;
