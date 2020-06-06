'use strict';

class CategoryService {
  constructor(offers) {
    this.offers = offers;
  }

  findAll() {
    const categories = this.offers.reduce((acc, offer) => {
      acc.add(...offer.category);

      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
