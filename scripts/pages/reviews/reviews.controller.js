class ReviewsController {
  constructor(MacroReview) {
    window._$ctrl = this;
    this._MacroReview = MacroReview;

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
}

ReviewsController.$inject = ['MacroReview'];

export default ReviewsController;
