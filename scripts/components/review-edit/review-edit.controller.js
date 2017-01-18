class ReviewEditController {
  constructor(Auth) {
    this._Auth = Auth;
  }

  $onInit() {
    this.init();
  }

  $onChanges(changes) {
    this.init();
  }

  init() {
    this.notes = _.get(this.macroReview, 'notes', '');
  }

  isEditable() {
    if (!this.macroReview) return false;

    if (!this.macroReview.coach) {
      return this._Auth.me.is_super;
    } else {
      return this.macroReview.coach.id === this._Auth.me.id
    }
  }

  update() {
    this.onUpdate({
      $event: {
        notes: this.notes
      }
    });
  }
}

ReviewEditController.$inject = ['Auth'];

export default ReviewEditController;
