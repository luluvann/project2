const router = require("express").Router();
const sequelize = require('../config/connection');
const {Index, Trail, User} = require ('../models');

//get all the cards and render to handlebar
router.get('/dashboard', (req,res) => {
  Trail.findAll({
    attributes: [
      "id",
      "user_id",
      "name",
      "difficulty_level",
      "location",
      "length",
      "elevation_gain",
      "est_time",
      "image_link",
      "fav_trail",
      "completed",
    ],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username"],
      },
    ],
  })
    .then((dbTrailsData) => {
      const cards = dbTrailsData.map(card => card.get({plain : true}))
      console.log("cards", cards)
      res.render('dashboard', { cards });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  
});


// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
