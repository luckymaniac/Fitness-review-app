import planNoteDialogTemplate from './plan-notes-dialog.html';

class PlanEditController {
  constructor($mdDialog, TrendRecord, AppConstants) {
    this._$mdDialog = $mdDialog;
    this._TrendRecord = TrendRecord;
    this._AppConstants = AppConstants;
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
      low_protein: 50,
      medium_protein: 100,
      high_protein: 150,
      super_protein: 200,
      low_carbs: 100,
      medium_carbs: 200,
      high_carbs: 300,
      super_carbs: 500,
      low_fat: 50,
      medium_fat: 90,
      high_fat: 120,
      super_fat: 160
    };

    // initialize plan object
    this.plan = _.clone(this.client.current_plan || this.default_plan);
    this.plan.notes = '';
    this.plan.start_date = new Date();

    this._TrendRecord.getByClient(this.client.id, this.todayStr)
      .then(res => {
        if (res.trend_records.length) {
          this.average.each(this.average, (v, k) => {
            this.average[k] = _floor(_.sumBy(res.trend_records, k) / this.trend_records.length);
          });
        }
      });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  planKey(level, prop) {
    return `${level}_${prop}`;
  }

  addNotes($event) {
    if (!this.plan) return;
    this._$mdDialog.show({
      controller: 'PlanNotesDialogController as $dialog',
      template: planNoteDialogTemplate,
      parent: angular.element(document.body),
      locals: {
        value: this.plan.notes
      }
    })
    .then(data => {
      this.plan.notes = data.notes;
    });
  }

  isPlanUpdatable() {
    if (!this.plan || !this.isEditable()) return false;
    return !this.planForm.$invalid && !_.isEmpty(this.plan.notes);
  }

  isEditable() {
    if (!this.client || !this.plan) return false;
    if (!this.client.current_plan) return true;
    return moment(this.plan.start_date).format("YYYY-MM-DD") !== this.client.current_plan.start_date;
  }

  update() {
    const object = _.clone(this.plan);
    object.start_date = moment(object.start_date).format("YYYY-MM-DD");
    this.onUpdate({
      $event: object
    });
  }
}

PlanEditController.$inject = ['$mdDialog', 'TrendRecord', 'AppConstants'];

export default PlanEditController;
