class MainMenuController {
  constructor($state, $interval, Client, Auth) {
    this._$state = $state;
    this._$interval = $interval;
    this._Client = Client;
    this._Auth = Auth;

    this.curentState = this._$state.current.name;
    this.assignee_badge = this._Client.assignee_badge;
  }

  $onChanges() {
    this._Client.pending_assignee_count()
      .then(res => {
        if (res && res.success) {
          this.assignee_badge = res.count;
        }
      });
  }

  isSuper() {
    return _.get(this._Auth.me, 'is_super', false);
  }
}

MainMenuController.$inject = ['$state', '$interval', 'Client', 'Auth'];

export default MainMenuController;
