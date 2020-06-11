'use strict';

class SearchService {
  constructor(offers) {
    this.offers = offers;
  }

  findAll(searchText) {
    return this.offers
      .filter((offer) => offer.title.includes(searchText));
  }
}

module.exports = SearchService;
