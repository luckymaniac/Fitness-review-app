class ReviewController {
  constructor($stateParams, MacroReview, AlertService, AppMessages) {
    this._MacroReview = MacroReview;
    this._AlertService = AlertService;
    this._AppMessages = AppMessages;

    this.init($stateParams);
  }

  init(params) {
    this.params = params;

    this.load();
  }

  load() {
    this.macro_review = null;
    this._MacroReview.get(this.params.id)
      .then(res => {
        this.macro_review = res.macro_review;
      });
  }

  onUpdate($event) {
    this._MacroReview.update(this.params.id, $event)
      .then(res => {
        if (res) {
          this.macro_review = res.macro_review;
          this._AlertService.success(this._AppMessages.macro_review.success_to_update);
        } else {
          this._AlertService.error(this._AppMessages.macro_review.failed_to_update);
        }
      });
  }
}

ReviewController.$inject = ['$stateParams', 'MacroReview', 'AlertService', 'AppMessages'];

export default ReviewController;
