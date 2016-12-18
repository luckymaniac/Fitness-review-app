class AccountController {
  constructor(Auth, AlertService, AppMessages) {
    this._Auth = Auth;
    this._AlertService = AlertService;
    this._AppMessages = AppMessages;
    this.init();
  }

  init() {
    this.resetAccount();
    this.resetPassword();
  }

  updateAccount() {
    this._Auth.updateProfile(this.account)
      .then(res => {
        if (res.success) {
          this._AlertService.success(this._AppMessages.account.success_to_update_account);
          this.resetAccount();
        } else {
          this._AlertService.error(this._AppMessages.account.fiiled_to_update_account);
        }
      });
  }

  resetAccount() {
    this.account = _.cloneDeep(this._Auth.me);
    if (this.accountForm) {
      this.accountForm.$setPristine();
      this.accountForm.$setUntouched();
    }
  }

  updatePassword() {
    this._Auth.updatePassword(this.accountPassword)
      .then(res => {
        if (res) {
          this._AlertService.success(this._AppMessages.account.success_to_update_password);
        } else {
          this._AlertService.error(this._AppMessages.account.failed_to_update_password);
        }
        this.resetPassword();
      });
  }

  resetPassword() {
    this.accountPassword = {
      password: "",
      password_confirmation: ""
    };
    if (this.passwordForm) {
      this.passwordForm.$setPristine();
      this.passwordForm.$setUntouched();
    }
  }
}

AccountController.$inject = ['Auth', 'AlertService', 'AppMessages'];

export default AccountController;
