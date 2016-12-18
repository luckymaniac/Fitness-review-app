import './alert.service.scss';

class AlertService {
  constructor($mdToast) {
    this._$mdToast = $mdToast;
  }

  success(message) {
    return this._$mdToast
      .show(this._getStandardConfig(message).theme('success-toast'));
  }

  error(message) {
    return this._$mdToast
      .show(this._getStandardConfig(message).theme('error-toast'));
  }

  _getStandardConfig(message) {
    return this._$mdToast
      .simple()
      .textContent(message)
      .position('bottom right')
      .hideDelay(5000);
  }
}

AlertService.$inject = ['$mdToast'];

export default AlertService;
