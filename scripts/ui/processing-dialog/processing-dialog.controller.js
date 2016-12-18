class ProcessingDialogController {
  constructor($scope, $mdDialog) {
    this._$scope = $scope;
    this._$mdDialog = $mdDialog;
    this.isProcessing=false;
    this.init();
  }


  init () {
    const unbindStateChangeStart = this._$scope.$on('$stateChangeStart', (event) => {
      if (!event.defaultPrevented) this.openModal();
    });

    const unbindStateChangeSuccess = this._$scope.$on('$stateChangeSuccess', () => this.closeModal());
    const unbindStateChangeError = this._$scope.$on('$stateChangeError', () => this.closeModal());

    this._$scope.$on('$destroy', () => {
      unbindStateChangeStart();
      unbindStateChangeSuccess();
      unbindStateChangeError();
    });
  }

  openModal() {
    if(!this.isProcessing) {
      this.isProcessing = true;
      this._$mdDialog.show({
        template: '<h4 layout layout-align="center">Processing...</h4>',
        parent: angular.element(document.body)
      });
    }
  }

  closeModal() {
    this._$mdDialog.hide();
    this.isProcessing = false;
  }
}

ProcessingDialogController.$inject = ['$scope', '$mdDialog']

export default ProcessingDialogController ;
