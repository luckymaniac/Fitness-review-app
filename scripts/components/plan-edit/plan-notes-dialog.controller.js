class PlanNotesDialogController {
  constructor ($mdDialog, value) {
      this._$mdDialog = $mdDialog;
      this.notes = value;

      console.log('>>', value);
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  save() {
    this._$mdDialog.hide({
      notes: this.notes
    });
  }

  isSavable() {
    return !_.isEmpty(this.notes)
  }
}

PlanNotesDialogController.$inject = ['$mdDialog', 'value'];
export default PlanNotesDialogController;
