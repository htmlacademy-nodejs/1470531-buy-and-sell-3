'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class OfferService {
  constructor(offers) {
    this.offers = offers;
  }

  create(offer) {
    const newOffer = {
      ...offer,
      id: nanoid(MAX_ID_LENGTH),
      comments: []
    };

    this.offers.push(newOffer);

    return newOffer;
  }

  drop(id) {
    const offer = this.offers.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this.offers = this.offers.filter((item) => item.id !== id);

    return offer;
  }

  findAll() {
    return this.offers;
  }

  findOne(id) {
    return this.offers.find((item) => item.id === id);
  }

  update(id, offer) {
    const oldOffer = this.offers.find((item) => item.id === id);

    return {...oldOffer, ...offer};
  }
}

module.exports = OfferService;
