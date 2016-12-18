class MainMenuController {
  constructor($state) {
    this._$state = $state;

    this.curentState = this._$state.current.name;
  }
}

MainMenuController.$inject = ['$state'];

export default MainMenuController;
