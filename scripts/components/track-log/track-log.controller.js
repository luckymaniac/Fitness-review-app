class TrackLogController {
  constructor($scope, TrendRecord, MacroReview, MacroPlan) {
    this._$scope = $scope;
    this._TrendRecord = TrendRecord;
    this._MacroReview = MacroReview;
    this._MacroPlan = MacroPlan;
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
    // this.

    this.load();
  }

  load() {
    if (!this.client) {
      return;
    }

    const promises = [
      this._TrendRecord.listByClient(this.client.id, this.query),
      this._MacroReview.listByClient(this.client.id, this.query),
      this._MacroPlan.listByClient(this.client.id, this.query)
    ];

    Promise.all(promises)
      .then(args => {
        this.trend_records = args[0].trend_records;
        this.macro_reviews = args[1].macro_reviews;
        this.macro_plans = args[2].macro_plans;

        this.combine();
      });
  }

  combine() {
    this.dataRows = [];
    _.each(this.trend_records, o => {
      const row = _.cloneDeep(o);
      row.date = o.trend_date;
      row.type = 'trend-record';
      this.dataRows.push(row);
    });
    _.each(this.macro_reviews, o => {
      const row = _.cloneDeep(o);
      row.date = o.request_date;
      row.type = 'macro-review';
      this.dataRows.push(row);
    });
    _.each(this.macro_plans, o => {
      const row = _.cloneDeep(o);
      row.date = o.start_date;
      row.type = 'macro-plan';
      this.dataRows.push(row);
    });

    this.dataRows = _.sortBy(this.dataRows, ['date', 'type']).reverse();

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
}

TrackLogController.$inject = ['$scope', 'TrendRecord', 'MacroReview', 'MacroPlan'];

export default TrackLogController;
