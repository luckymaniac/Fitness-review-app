class MessageEditorController {
  constructor() {
  }

  $onChanges(changes) {
    this.init();
  }

  init() {
    this.isExpanded = true;
    this.content = "";

    if (this.messageForm) {
      this.messageForm.$setPristine();
      this.messageForm.$setUntouched();
    }
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  update() {
    this.onUpdate({
      $event: {
        content: this.content
      }
    });
  }
}

MessageEditorController.$inject = [];

export default MessageEditorController;
