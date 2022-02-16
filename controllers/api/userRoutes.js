const router = require('express').Router();
const { User } = require("../../models");

// Sign Up -- create new user
router.post('/', async (req, res) => {
    try {
       const userData = await User.create({
           username: req.body.username,
           email: req.body.email,
           password: req.body.password,
           user_id: req.session.user_id,
           logged_in: req.session.logged_in,
       });
       
       req.session.save(() => {
           req.session.user_id = userData.id;
           req.session.logged_in = true;

           res.status(200).json(userData);
       })
    } catch (err) {
        res.status(400).json(err);
        console.log("USER CREATE ERR");
    }
});

// Log In route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
              .status(400)
              .json({ message: "Incorrect username or password, please try again" });
            return;
          }


          req.session.save(() => {
              req.session.user_id = userData.id;
              req.session.logged_in = true;

              res.json({ user: userData, message: 'You are now logged in!' });
              console.log('***********************')
              console.log(userData);
              console.log('***********************')
          })
          console.log('--------------------------')
          console.log(req.session.logged_in)
          console.log('--------------------------')

    } catch (err) {
        res.status(400).json(err);
        console.log("LOGIN ERR");
    }
});


// Log Out route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});






// router.post("/", async (req, res) => {
//     try {
//         const newUser = await User.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         })
//     }
// })

module.exports = router;