class LogoController {
  constructor() {
    this.realSize = 32;
  }

  $onInit() {
    this.init();
  }

  $onChanges(changes) {
    this.init();
  }

  init() {
    if (this.size) {
      this.realSize = this.size;
    }
  }
}

export default LogoController;
