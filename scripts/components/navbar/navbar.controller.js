class NavbarController {
  constructor($state, Auth, AppConstants) {
    this._$state = $state;
    this._Auth = Auth;
    this._AppConstants = AppConstants;
  }

  getTitle() {
    return this._$state.current.title || this._AppConstants.appName; 
  }

  getName() {
    return `${_.get(this._Auth.me, 'first_name', '')} ${_.get(this._Auth.me, 'last_name', '')}`
  }

  logout() {
    this._Auth.logout()
      .then(res => {
        if (res) {
          this._$state.go('login');
        }
      });
  }
}

NavbarController.$inject = ['$state', 'Auth', 'AppConstants'];

export default NavbarController;
