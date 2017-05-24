class ClientInfoController {
  constructor(Auth, Goal, Coach) {
    this._Auth = Auth;
    this._Goal = Goal;
    this._Coach = Coach;
  }

  $onChanges(changes) {
    this.init();
  }

  init() {
    this.isExpanded = true;

    this.ages = {
      10: "Below 20",
      20: "20 - 30",
      30: "31 - 40",
      40: "41 - 50",
      50: "Above 50"
    };

    this.supers = [];

    this.isEditable = this._Auth.me.is_super;
    this.isEditGoal = false;
    this.isEditGoalWeight = false;
    this.isEditCoach = false;

    this.load();
  }

  load() {
    this._Goal.list().then(res => {
      this.goals = res.goals;
      this.editGoal(false);
    });

    this._Coach.supers().then(res => {
      this.supers = _.get(res, 'coaches', []);
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  editGoal(v = true) {
    const goal_id = _.get(this.client, 'bio.goal_id');
    this.goal = _.find(this.goals, {id: goal_id});
    this.goal_phase = _.get(this.client, 'bio.goal_phase') || 1;

    this.isEditGoal = v;
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
    this.editGoal(false);
  }

  editGoalWeight(v = true) {
    this.goal_weight = _.get(this.client, 'bio.goal_weight') || 0;
    this.is_up_goal_weight = _.get(this.client, 'bio.is_up_goal_weight') || false;

    this.isEditGoalWeight = v;
  }

  reverseUpGoalWeight() {
    this.is_up_goal_weight = !this.is_up_goal_weight;
  }

  updateGoalWeight() {
    const data = {
      goal_weight: this.goal_weight,
      is_up_goal_weight: this.is_up_goal_weight
    };

    this.onUpdate({
      $event: data
    });
  }

  cancelGoalWeight() {
    this.editGoalWeight(false);
  }

  isMyAssignee() {
    return _.get(this.client, 'setting.coach.id') === this._Auth.me.id;
  }

  editCoach(v = true) {
    this.isEditCoach = v;
    this.assigned_coach = v ? _.find(this.supers, {id: _.get(this.client, 'setting.coach.id', null)}) : null;
  }

  queryCoaches(search) {
    const q = search ? search.toLowerCase() : '';
    return this.supers.filter(o => this.coachName(o).toLowerCase().indexOf(q) >= 0);
  }

  coachName(item) {
    return item ? item.first_name + ' ' + item.last_name : '';
  }

  updateCoach() {
    const data = {
      coach_id: this.assigned_coach ? this.assigned_coach.id : null
    };
    this.onUpdateCoach({
      $event: data
    });
  }

  setMeAsCoach() {
    this.assigned_coach = _.find(this.supers, {id: this._Auth.me.id});
  }
}

ClientInfoController.$inject = ['Auth', 'Goal', 'Coach'];

export default ClientInfoController;
