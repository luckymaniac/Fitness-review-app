class MessageController {
  constructor($stateParams, Client, Message, AlertService, AppMessages) {
    this._Client = Client;
    this._Message = Message;
    this._AlertService = AlertService;
    this._AppMessages = AppMessages;

    this.init($stateParams);
  }

  init(params) {
    this.params = params;
    this.load();
  }

  load() {
    this.client = null;

    this._Client.get(this.params.client_id)
      .then(res => {
        this.client = res.client;
      });
  }

  onUpdate($event) {
    if (this.client) {
      this._Message.createByClient(this.client.id, $event)
        .then(res => {
          if (res) {
            this._AlertService.success(this._AppMessages.message.success_to_create);
            this.load();
          } else {
            this._AlertService.error(this._AppMessages.message.failed_to_create);
          }
        });
    }
  }
}

MessageController.$inject = ['$stateParams', 'Client', 'Message', 'AlertService', 'AppMessages'];

export default MessageController;
