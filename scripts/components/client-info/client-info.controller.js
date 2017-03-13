class ClientInfoController {
  constructor(Auth, Goal) {
    this._Auth = Auth;
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
    this.goal_phase = _.get(this.client, 'bio.goal_phase') || 1;
    this.goal_weight = _.get(this.client, 'bio.goal_weight') || 0;

    this._Goal.list().then(res => {
      this.goals = res.goals;
      this.goal = _.find(this.goals, {id: goal_id});
    });

    this.isEditable = this._Auth.me.is_super;
    this.isEditGoal = false;
    this.isEditGoalWeight = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  editGoal(v = true) {
    this.isEditGoal = v;
  }

  editGoalWeight(v = true) {
    this.isEditGoalWeight = v;
  }

  updateGoal() {
    const data = {
      goal_id: this.goal.id,
      goal_phase: this.goal.phases ? this.goal_phase : null
    };

    this.onUpdate({
      $event: data
    });
  }

  cancelGoal() {
    const goal_id = _.get(this.client, 'bio.goal_id');
    this.goal = _.find(this.goals, {id: goal_id});
    this.goal_phase = _.get(this.client, 'bio.goal_phase') || 1;
    this.editGoal(false);
  }

  updateGoalWeight() {
    const data = {
      goal_weight: this.goal_weight
    };

    this.onUpdate({
      $event: data
    });
  }

  cancelGoalWeight() {
    this.goal_weight = _.get(this.client, 'bio.goal_weight') || 0;
    this.editGoalWeight(false);
  }
}

ClientInfoController.$inject = ['Auth', 'Goal'];

export default ClientInfoController;
