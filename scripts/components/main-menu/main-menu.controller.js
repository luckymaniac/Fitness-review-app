class MainMenuController {
  constructor($state, $interval, Client) {
    this._$state = $state;
    this._$interval = $interval;
    this._Client = Client;

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
}

MainMenuController.$inject = ['$state', '$interval', 'Client'];

export default MainMenuController;
