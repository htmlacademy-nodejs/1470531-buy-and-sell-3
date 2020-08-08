'use strict';

const axios = require(`axios`);

const API_URL = `http://localhost:3000/api`;

class DataService {
  constructor(offer) {
    this.offer = offer;
  }

  static async getAllOffers() {
    try {
      const response = await axios.get(`${API_URL}/offers`);

      return response.data;
    } catch (error) {
      console.error(error);

      return [];
    }
  }

  async saveNewOffer() {
    try {
      return await axios.post(`${API_URL}/offers`, {
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
      const response = await axios.get(`${API_URL}/offers/${offer.id}/comments`);

      offersWithComments.push({
        ...offer,
        comments: response.data
      });
    }

    return offersWithComments;
  }

  static async getLastOffersWithComments(count = 3) {
    try {
      const offers = await DataService.getAllOffers();
      const lastOffers = offers.slice(0, count).map((offer) => ({
        ...offer,
        comments: null
      }));

      return await DataService.getCommentsByOffersArray(lastOffers);

    } catch (err) {
      console.error(err);

      return [];
    }
  }

  static async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/category`);

      return response.data;
    } catch (err) {
      console.error(err);

      return [];
    }
  }

  static async getSearchResults(query) {
    try {
      const response = await axios.get(`${API_URL}${query}`);

      return response.data;
    } catch (err) {
      console.error(err);

      return [];
    }
  }
}

module.exports = DataService;
