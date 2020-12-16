const User = require('../models/User');

module.exports = {
  private: async (req, res, next) => {
    if(!req.query.token && !req.body.token)
    {
      res.json({error_message: `eae Allowed: ${true}`});
      return;
    }
    let token = '';
    if(req.query.token){
      token = req.query.token;
    }
    if(req.body.token){
      token = req.body.token;
    }
    if(token == ''){
      res.json({error_message: `Not Allowed: ${true}`});
      return;
    }
    const user = await User.findOne({token});
    if(!user){
      res.json({error_message: `Token Invalid: ${true}`});
      return;
    }
    next();
  }
};