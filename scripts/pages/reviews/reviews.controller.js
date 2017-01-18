class ReviewsController {
  constructor(MacroReview, Auth) {
    window._$ctrl = this;
    this._MacroReview = MacroReview;
    this._Auth = Auth;

    this.init();
  }

  init() {
    this.query = {
      page: 1,
      size: 10,
      search: null,
      scope: 'all'
    };
    this.total = 0;

    this.load();
  }

  load() {
    this.promise = this._MacroReview.list(this.query);
    this.promise.then(res => {
      if (res) {
        this.total = res.total;
        this.macro_reviews = res.macro_reviews;
      }
    });
  }

  onSearch() {
    this.load();
  }

  //===== Table =====

  onPaginate(page, limit) {
    const self = window._$ctrl;;
    self.query.page = page;
    self.query.limit = limit;
    self.load();
  }

  onOrder(order) {
    const self = window._$ctrl; // TODO: get rid of this dirty hack
    self.query.sort = order;
    self.load();
  }

  isSuper() {
    return this._Auth.me.is_super;
  }
}

ReviewsController.$inject = ['MacroReview', 'Auth'];

export default ReviewsController;
