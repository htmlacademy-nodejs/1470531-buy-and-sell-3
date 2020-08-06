'use strict';

const axios = require(`axios`);
const {API_URL} = require(`../../constants`);

class DataService {
  static async getAllOffers() {
    try {
      const response = await axios.get(`${API_URL}/offers`);

      return response.data;
    } catch (error) {
      return console.error(error);
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

  static async getLastThreeOffersWithComments() {
    try {
      const offers = await DataService.getAllOffers();
      const lastThreeOffers = offers.slice(0, 3).map((offer) => ({
        ...offer,
        comments: null
      }));

      return await DataService.getCommentsByOffersArray(lastThreeOffers);

    } catch (err) {
      return console.error(err);
    }
  }

  static async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/category`);

      return response.data;
    } catch (err) {
      return console.error(err);
    }
  }
}

module.exports = DataService;
