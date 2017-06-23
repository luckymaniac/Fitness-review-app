class PlanEditController {
  constructor(Auth, TrendRecord, MacroGoal, MacroPlan, AutoReview, AppConstants) {
    this._Auth = Auth;
    this._TrendRecord = TrendRecord;
    this._AppConstants = AppConstants;
    this._MacroGoal = MacroGoal;
    this._MacroPlan = MacroPlan;
    this._AutoReview = AutoReview;

    this.init();
  }

  $onChanges(changes) {
    this.load();
  }

  init() {
    this.isExpanded = true;
    this.todayStr = moment().format("YYYY-MM-DD");
    this.today = new Date();

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

    this._MacroGoal.list()
      .then(res => {
        this.macro_goals = res.macro_goals;
      });

    this._MacroPlan.weekly_goals()
      .then(res => {
        if (res) {
          this.weekly_goals = res.weekly_goals;
        }
      });

    this._AutoReview.list()
      .then(res => {
        this.auto_reviews = res.auto_reviews;
      });
  }

  load() {
    if (!this.client) return;

    // initialize plan object
    if (!this.plan) {
      this.plan = _.clone(this.client.current_plan || this.default_plan[_.get(this.client, 'bio.gender', 'F')]);
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

    this.initSuperDayList(this.weekly_goals);
    this.initAutoReviewList();
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  planKey(level, prop) {
    return `${level}_${prop}`;
  }

  isPlanUpdatable() {
    return this.plan ? !this.planForm.$invalid : false;
  }

  isSuper() {
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

  // Handle SUPER day functions
  initSuperDayList(list) {
    this.super_day_list = _.cloneDeep(list);
    this.super_day = _.find(list, {goals: this.plan.weekly_goals});
    if (!this.super_day) {
      this.super_day = {
        weekday: this.plan.weekly_goals,
        goals: this.plan.weekly_goals
      };
      this.super_day_list.unshift(this.super_day);
    }
  }

  querySuperDay(search) {
    const q = search.toLowerCase();
    return _.filter(this.super_day_list, item => {
      return item.weekday.toLowerCase().indexOf(q) !== -1;
    });
  }

  addSuperDay(search) {
    if (!search || search.length != 7) return;
    const q = search.toUpperCase();

    if (_.find(this.super_day_list, {goals: q})) return;
    // console.log(this.macro_goals);
    const arr = _.filter(q.split(''), key => {
      return _.find(this.macro_goals, {key});
    });

    if (arr.length === q.length) {
      this.super_day_list.unshift({
        weekday: q,
        goals: q
      });
    }
  }

  setSuperDay(item) {
    if (!item) {
      this.plan.weekly_goals = "";
    } else {
      this.plan.weekly_goals = item.goals;
    }
  }

  // Handle Auto-Review functions
  initAutoReviewList() {
    if (this.plan.auto_review_id) {
      this.auto_review = _.find(this.auto_review || [], {id: this.plan.auto_review_id}, null)
    }
  }

  queryAutoReview(search) {
    const q = search.toLowerCase();
    return _.filter(this.auto_reviews || [], item => {
      return item.name.toLowerCase().indexOf(q) !== -1;
    });
  }

  setAutoReview(item) {
    if (!item) {
      this.plan.auto_review_id = null;
      this.plan.auto_review_after = null;
    } else {
      this.plan.auto_review_id = item.id;
      this.plan.auto_review_after = item.days;
      this.plan.notes = item.note;
    }
  }
}

PlanEditController.$inject = ['Auth', 'TrendRecord', 'MacroGoal', 'MacroPlan', 'AutoReview', 'AppConstants'];

export default PlanEditController;
