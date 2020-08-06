'use strict';

const axios = require(`axios`);
const {API_URL} = require(`../../constants`);

class Offer {
  constructor(offer) {
    this.offer = offer;
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
}

module.exports = Offer;
