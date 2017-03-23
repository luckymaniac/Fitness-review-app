class PlanEditController {
  constructor(Auth, TrendRecord, MacroGoal, AppConstants) {
    this._Auth = Auth;
    this._TrendRecord = TrendRecord;
    this._AppConstants = AppConstants;
    this._MacroGoal = MacroGoal;
  }

  $onInit() {
    this.init();
  }

  $onChanges(changes) {
    this.init();
  }

  init() {
    this.isExpanded = true;
    this.todayStr = moment().format("YYYY-MM-DD");
    this.today = new Date();
    if (!this.client) return;

    this.max = this._AppConstants.trend_max_data;
    this.levels = ['low', 'medium', 'high', 'super'];
    this.props = ['protein', 'carbs', 'fat'];

    this.average = {
      protein: 0,
      carbs: 0,
      fat: 0
    };

    this.default_plan = {
      M: {
        low_protein: 175,
        medium_protein: 175,
        high_protein: 175,
        super_protein: 175,
        low_carbs: 172,
        medium_carbs: 247,
        high_carbs: 281,
        super_carbs: 281,
        low_fat: 89,
        medium_fat: 74,
        high_fat: 74,
        super_fat: 89,
        weekly_goals: 'MLHMMLS'
      },
      F: {
        low_protein: 135,
        medium_protein: 135,
        high_protein: 135,
        super_protein: 135,
        low_carbs: 134,
        medium_carbs: 217,
        high_carbs: 229,
        super_carbs: 229,
        low_fat: 71,
        medium_fat: 54,
        high_fat: 54,
        super_fat: 71,
        weekly_goals: 'MLHMMLS'
      }
    };

    this.initFields = [
      ['super_protein', 'high_protein', 'medium_protein', 'low_protein'],
      ['super_carbs', 'high_carbs'],
      ['super_fat', 'low_fat'],
      ['high_fat', 'medium_fat']
    ];

    // initialize plan object
    if (!this.plan) {
      this.plan = _.clone(this.default_plan[_.get(this.client, 'bio.gender', 'M')]);
      this.plan.id = null;
      this.plan.notes = '';
      this.plan.start_date = new Date();
      this.plan.auto_review_after = null;
    }

    this._TrendRecord.getByClient(this.client.id, this.todayStr)
      .then(res => {
        if (res.trend_records.length) {
          _.each(this.average, (v, k) => {
            this.average[k] = _.floor(_.sumBy(res.trend_records, k) / res.trend_records.length);
          });
        }
      });
    this._MacroGoal.list()
      .then(res => {
        this.macro_goals = res.macro_goals;
        this.weeklyGoals = _.map(res.macro_goals, 'key').join(',');
        this.weeklyGoalsPattern = `[${_.map(res.macro_goals, 'key').join('')}]{7}`;
      });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  planKey(level, prop) {
    return `${level}_${prop}`;
  }

  isPlanUpdatable() {
    if (!this.plan || !this.isEditable()) return false;
    return !this.planForm.$invalid;
  }

  isSuper() {
    return this._Auth.me.is_super;
  }

  isEditable() {
    if (this.plan && this.plan.coach && this.plan.coach.id !== this._Auth.me.id) return false;

    return this._Auth.me.is_super;
  }

  update() {
    const object = _.clone(this.plan);
    object.start_date = moment(object.start_date).format("YYYY-MM-DD");
    this.onUpdate({
      $event: object
    });
  }

  addNew() {
    this.onNew();
  }

  onChangePlan(key) {
    const group = _.find(this.initFields, g => g.indexOf(key) >= 0);
    if (group) {
      group.forEach(k => {
        this.plan[k] = this.plan[key];
      });
      _.remove(this.initFields, g => g.indexOf(key) >= 0);
    }
  }
}

PlanEditController.$inject = ['Auth', 'TrendRecord', 'MacroGoal', 'AppConstants'];

export default PlanEditController;
