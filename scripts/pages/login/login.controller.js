class LoginController {
  constructor($state, AppMessages, Auth, AlertService) {
    this._$state = $state;
    this._AppMessages = AppMessages;
    this._Auth = Auth;
    this._AlertService = AlertService;

    this.init();
  }

  init() {
    this.user = {};
  }

  login() {
    this._Auth.login(this.user)
      .then(result => {
        if (result) {
          this._$state.go('home');
        } else {
          this._AlertService.error(this._AppMessages.auth.login_failed);
        }
      });
  }
}

LoginController.$inject = ['$state', 'AppMessages', 'Auth', 'AlertService'];

export default LoginController;
