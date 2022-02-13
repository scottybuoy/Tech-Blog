const router = require('express').Router();
const { User } = require("../../models");

router.post('/', async (req, res) => {
    try {
       const userData = await User.create({
           username: req.body.username,
           email: req.body.email,
           password: req.body.password,
           user_id: req.session.user_id,
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






// router.post("/", async (req, res) => {
//     try {
//         const newUser = await User.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         })
//     }
// })

module.exports = router;