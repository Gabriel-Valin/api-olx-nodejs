const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {validationResult, matchedData} = require('express-validator');
const User = require('../models/User');
const State = require('../models/State');

module.exports = {
  signin: async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({message_error: errors.mapped()});
      return;
    }
    const data = matchedData(req);

    const user = await User.findOne({email: data.email});
    if(!user){
      res.json({message_error: "Email or Password dont verified."});
      return;
    }

    const matchPass = await bcrypt.compare(data.password, user.passwordHash);
    if(!matchPass){
      res.json({message_error: "Email or Password dont verified."});
      return;
    }

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;
    await user.save();

    res.json({token, email: data.email});
  },
  signup: async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({message_error: errors.mapped()});
      return;
    }
    const data = matchedData(req);
    const user = await User.findOne({
      email: data.email
    });
    if(user){
      res.json({
        error: {email:{msg: 'Email already existing'}}
      });
      return;
    }
    if(mongoose.Types.ObjectId.isValid(data.state)){
    const stateItem = await State.findById(data.state);
    if(!stateItem) {
      res.json({
        error: {state:{msg: 'Estado não existe'}}
      });
      return;
    }
  }
    else {
      res.json({
        error: ({error:{msg: 'State code invalid.'}})
      });
      return; 
  }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      name: data.name,
      email: data.email,
      passwordHash,
      token: token,
      state: data.state
    });
    await newUser.save();
    res.json({token});
    
  },
};
