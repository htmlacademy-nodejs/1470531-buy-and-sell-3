'use strict';

const {Router} = require(`express`);
const path = require(`path`);
const multer = require(`multer`);
const DataService = require(`../data-service/data-service`);
const {HttpCode} = require(`../../constants`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), `src`, `express`, `public`, `img`));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + `-` + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage});
const offersRoutes = new Router();
let categories;

offersRoutes.get(`/add`, async (req, res) => {
  categories = await DataService.getCategories();

  return res.render(`offers/new-ticket`, {
    categories,
    newOffer: {}
  });
});

offersRoutes.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const newOffer = {
    title: req.body.ticket_name || ``,
    description: req.body.comment || ``,
    category: req.body.category || ``,
    sum: req.body.price || ``,
    type: req.body.action || ``,
    picture: req.file && req.file.filename || ``,
  };

  if (!req.file) {
    return res.render(`offers/new-ticket`, {
      fileError: true,
      categories,
      newOffer
    });
  }

  try {
    const offer = new DataService(newOffer);
    const response = await offer.saveNewOffer();

    if (response && response.statusCode === HttpCode.BAD_REQUEST) {
      return res.render(`offers/new-ticket`, {
        categories,
        newOffer
      });
    }

    return res.redirect(`/my`);
  } catch (err) {
    return console.error(err);
  }
});

offersRoutes.get(`/:id`, (req, res) => res.render(`offers/ticket`));
offersRoutes.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRoutes.get(`/edit/:id`, (req, res) => res.render(`offers/ticket-edit`));

module.exports = offersRoutes;

