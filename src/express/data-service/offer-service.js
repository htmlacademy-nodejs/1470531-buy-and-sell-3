'use strict';

const axios = require(`axios`);
const {API_URL, TimeInMilliseconds} = require(`../../constants`);

const instance = axios.create({
  baseURL: API_URL,
  timeout: TimeInMilliseconds.second * 30
});

class OfferService {
  constructor(offer) {
    this.offer = offer;
  }

  static async getAllOffers() {
    try {
      const response = await instance.get(`/offers`);

      return response.data;
    } catch (error) {
      console.error(error);

      return [];
    }
  }

  async saveNewOffer() {
    try {
      return await instance.post(`/offers`, {
        title: this.offer.title,
        description: this.offer.description,
        category: typeof this.offer.category === `string` ? [this.offer.category] : this.offer.category || ``,
        sum: this.offer.sum,
        type: this.offer.type,
        picture: this.offer.picture,
        picture2x: this.offer.picture
      });

    } catch (err) {
      return console.error(err);
    }
  }

  static async getCommentsByOffersArray(offers) {
    const offersWithComments = [];

    for (let offer of offers) {
      const response = await instance.get(`/offers/${offer.id}/comments`);

      offersWithComments.push({
        ...offer,
        comments: response.data
      });
    }

    return offersWithComments;
  }

  static async getLastOffersWithComments(count = 3) {
    try {
      const offers = await OfferService.getAllOffers();
      const lastOffers = offers.slice(0, count).map((offer) => ({
        ...offer,
        comments: null
      }));

      return await OfferService.getCommentsByOffersArray(lastOffers);

    } catch (err) {
      console.error(err);

      return [];
    }
  }

  static async getCategories() {
    try {
      const response = await instance.get(`/category`);

      return response.data;
    } catch (err) {
      console.error(err);

      return [];
    }
  }

  static async getSearchResults(query) {
    try {
      const response = await instance.get(`${query}`);

      return response.data;
    } catch (err) {
      console.error(err);

      return [];
    }
  }
}

module.exports = OfferService;
