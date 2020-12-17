const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

const { validationResult, matchedData } = require('express-validator');


module.exports = {
  getStates: async (req, res) => {
    let states = await State.find();
    res.json({ states });
  },
  info: async (req, res) => {
    let token = req.query.token;

    const user = await User.findOne({ token });
    const state = await State.findById(user.state);
    const ads = await Ad.find({ idUser: user._id.toString() });

    let adList = [];
    for (let i in ads) {

      const category = await Category.findById(ads[i].category);
      /* adList.push({
        id: ads[i]._id,
        status: ads[i].status,
        images: ads[i].images,
        dateCreated: ads[i].dateCreated,
        title: ads[i].title,
        price: ads[i].price,
        negotiable: ads[i].negotiable,
        description: ads[i].description,
        views: ads[i].views,
        category: category.slug
      }) */
      adList.push({ ...ads[i], category: category.slug });
    }

    res.json({
      name: user.name,
      email: user.email,
      state: state.name,
      ads: adList
    });

  },
  editAction: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ message_error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    let updates = {};

    if (data.name) { updates.name = data.name }

    if (data.email) {
      const emailChecker = await User.findOne({ email: data.email });
      if (emailCheck) {
        res.json({ error: 'E-mail existing.' });
        return;
      }
      updates.email = data.email;
    }

    if (data.state) {
      if (mongoose.Types.ObjectId.isValid(data.state)) {
        const stateChecker = await State.findById(data.state);
        if (!stateChecker) {
          res.json({ error: 'State not valid.' });
          return;
        }
        updates.state = data.state;
      } else {
        res.json({error: "State Code invalid."});
        return;
      }
    }

    if (data.password) {
      updates.password = await bcrypt.hash(data.password, 10);
    }
    const user = await User.findOneAndUpdate({ token: data.token }, { $set: updates });
    res.json({});
  }
};
