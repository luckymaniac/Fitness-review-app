class TrackLogController {
  constructor($scope, TrendRecord, MacroReview, MacroPlan, Note, GoalRecord, Message) {
    this._$scope = $scope;
    this._TrendRecord = TrendRecord;
    this._MacroReview = MacroReview;
    this._MacroPlan = MacroPlan;
    this._Note = Note;
    this._GoalRecord = GoalRecord;
    this._Message = Message;
  }

  $onInit() {
    this.init();
  }

  $onChanges(changes) {
    this.init();
  }

  init() {
    this.query = {
      year: moment().year(),
      month: moment().month() + 1
    };
    this.months = moment.monthsShort();

    this.load();
  }

  load() {
    if (!this.client) {
      return;
    }

    const promises = [
      this._TrendRecord.listByClient(this.client.id, this.query),
      this._MacroReview.listByClient(this.client.id, this.query),
      this._MacroPlan.listByClient(this.client.id, this.query),
      this._Note.listByClient(this.client.id, this.query),
      this._GoalRecord.listByClient(this.client.id, this.query),
      this._Message.listByClient(this.client.id, this.query)
    ];

    Promise.all(promises)
      .then(args => {
        this.trend_records = args[0].trend_records;
        this.macro_reviews = args[1].macro_reviews;
        this.macro_plans = args[2].macro_plans;
        this.notes = args[3].notes;
        this.goal_records = args[4].goal_records;
        this.messages = args[5].messages;

        this.combine();
      });
  }

  combine() {
    this.dataRows = [];

    this.notes          = _.sortBy(this.notes, 'created_at');
    this.trend_records  = _.sortBy(this.trend_records, 'trend_date');
    this.macro_plans    = _.sortBy(this.macro_plans, 'created_at');
    this.macro_reviews  = _.sortBy(this.macro_reviews, 'created_at');
    this.goal_records   = _.sortBy(this.goal_records, 'created_at');
    this.messages       = _.sortBy(this.messages, 'created_at');

    _.each(this.goal_records, o => {
      const row = _.cloneDeep(o);
      row.date = moment(new Date(o.created_at)).format('YYYY-MM-DD');
      row.type = 'goal-record';
      this.dataRows.push(row);
    });
    _.each(this.macro_reviews, o => {
      const row = _.cloneDeep(o);
      row.date = o.request_date;
      row.type = 'macro-review';
      row.pending = !o.review_date;
      this.dataRows.push(row);
    });
    _.each(this.macro_plans, o => {
      const row = _.cloneDeep(o);
      row.date = o.start_date;
      row.type = 'macro-plan';
      this.dataRows.push(row);
    });
    _.each(this.trend_records, o => {
      const row = _.cloneDeep(o);
      row.date = o.trend_date;
      row.type = 'trend-record';
      this.dataRows.push(row);
    });
    _.each(this.notes, o => {
      const row = _.cloneDeep(o);
      row.date = moment(new Date(o.created_at)).format('YYYY-MM-DD');
      row.type = 'client-note';
      row.workout_class = _.kebabCase(_.get(row, 'workout_type.title', ''));
      this.dataRows.push(row);
    });
    _.each(this.messages, o => {
      const row = _.cloneDeep(o);
      row.date = moment(new Date(o.created_at)).format('YYYY-MM-DD');
      row.type = 'message';
      this.dataRows.push(row);
    });

    this.dataRows = _.sortBy(this.dataRows, ['date']).reverse();

    this._$scope.$apply();
  }

  togglePlan(item) {
    if (item.isExpanded) {
      item.isExpanded = false;
    } else {
      this.dataRows.forEach(r => {
        if (r.type === 'macro-plan') {
          r.isExpanded = r.id === item.id;
        }
      });
    }
  }

  isTrendRecord(item) {
    return item.type === 'trend-record';
  }

  isMacroReview(item) {
    return item.type === 'macro-review';
  }

  isMacroPlan(item) {
    return item.type === 'macro-plan';
  }

  isClientNote(item) {
    return item.type === 'client-note';
  }

  isGoalRecord(item) {
    return item.type === 'goal-record';
  }

  isMessage(item) {
    return item.type === 'message';
  }

  prev() {
    let prev = moment().year(this.query.year).month(this.query.month - 1).date(1).subtract(1, 'month');
    this.query.year = prev.year();
    this.query.month = prev.month() + 1;

    this.load();
  }

  next() {
    let next = moment().year(this.query.year).month(this.query.month - 1).date(1).add(1, 'month');
    this.query.year = next.year();
    this.query.month = next.month() + 1;

    this.load();
  }

  getCellClass(item, prop) {
    const goal = _.get(item, 'macro_goal.title', '').toLowerCase();
    const value = _.get(item, prop, 0);

    let className = '';
    if (prop === 'protein' || prop === 'carbs' || prop === 'fat') {
      const key = goal + '_' + prop;
      const plan = _.get(item, ['macro_plan', key], 0);
      className = 'green';

      if (prop === 'fat') {
        if (value < plan - 5) className = 'orange';
        else if (value > plan + 5) className = 'red';
      } else {
        if (value < plan - 10) className = 'orange';
        else if (value > plan + 10) className = 'red';
      }
    } else if (prop === 'steps') {
      if (value > 8000) className = 'green';
      else if (value < 5000) className = 'red';
      else className = 'orange';
    } else if (prop === 'sleep_minutes') {
      if (value > 7*60) className = 'green';
      else if (value < 6 * 60) className = 'red';
      else className = 'orange';
    } else if (prop === 'calories_burned') {
      const plan = _.get(item, ['macro_plan', `${goal}_protein`], 0) * 4 
                 + _.get(item, ['macro_plan', `${goal}_carbs`], 0) * 4
                 + _.get(item, ['macro_plan', `${goal}_fat`], 0) * 9;
      if (value < plan * 0.95) className = 'orange';
      else if (value > plan * 1.05) className = 'red';
      else className = 'green';
    }

    return className;
  }
}

TrackLogController.$inject = ['$scope', 'TrendRecord', 'MacroReview', 'MacroPlan', 'Note', 'GoalRecord', 'Message'];

export default TrackLogController;
